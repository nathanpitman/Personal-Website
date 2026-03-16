import { readdir, readFile, writeFile, stat } from "fs/promises";
import { join, extname, basename } from "path";
import Anthropic from "@anthropic-ai/sdk";

const CONTENT_DIR = "src/content";
const API_DELAY_MS = 200;
const MODEL = "claude-sonnet-4-20250514";

const apiKey = process.env.ANTHROPIC_API_KEY;
let anthropic: Anthropic | null = null;
if (apiKey) {
  anthropic = new Anthropic({ apiKey });
} else {
  console.warn(
    "WARNING: ANTHROPIC_API_KEY not set. Posts with 300+ words will be skipped."
  );
}

async function findMarkdownFiles(dir: string): Promise<string[]> {
  const results: string[] = [];
  const entries = await readdir(dir, { withFileTypes: true });
  for (const entry of entries) {
    const fullPath = join(dir, entry.name);
    if (entry.isDirectory()) {
      results.push(...(await findMarkdownFiles(fullPath)));
    } else if (
      entry.isFile() &&
      [".md", ".mdx"].includes(extname(entry.name).toLowerCase())
    ) {
      results.push(fullPath);
    }
  }
  return results;
}

function parseFrontmatter(content: string): {
  frontmatter: string;
  body: string;
  attrs: Record<string, unknown>;
} | null {
  const match = content.match(/^---\r?\n([\s\S]*?)\r?\n---\r?\n([\s\S]*)$/);
  if (!match) return null;
  const frontmatter = match[1];
  const body = match[2];
  const attrs: Record<string, unknown> = {};
  for (const line of frontmatter.split("\n")) {
    const kv = line.match(/^(\w[\w-]*):\s*(.*)$/);
    if (kv) {
      attrs[kv[1]] = kv[2];
    }
  }
  return { frontmatter, body, attrs };
}

function hasDescription(frontmatter: string): boolean {
  return /^description:/m.test(frontmatter);
}

function countWords(text: string): number {
  const cleaned = text
    .replace(/!\[.*?\]\(.*?\)/g, "")
    .replace(/\[([^\]]*)\]\([^)]*\)/g, "$1")
    .replace(/[#*_`~>|[\]()-]/g, " ")
    .replace(/<[^>]+>/g, " ");
  return cleaned.split(/\s+/).filter((w) => w.length > 0).length;
}

function extractFirstParagraph(body: string): string {
  const lines = body.split("\n");
  let paragraph = "";
  for (const line of lines) {
    const trimmed = line.trim();
    if (!trimmed) {
      if (paragraph) break;
      continue;
    }
    if (
      trimmed.startsWith("#") ||
      trimmed.startsWith("![") ||
      trimmed.startsWith("<")
    )
      continue;
    paragraph += (paragraph ? " " : "") + trimmed;
  }
  const cleaned = paragraph
    .replace(/\[([^\]]*)\]\([^)]*\)/g, "$1")
    .replace(/\\[*_`~[\]]/g, "")
    .replace(/[*_`~]+/g, "")
    .replace(/\s+/g, " ")
    .trim();
  if (cleaned.length <= 160) return cleaned;
  return cleaned.slice(0, 157).replace(/\s+\S*$/, "") + "...";
}

function escapeYamlString(str: string): string {
  if (
    str.includes(":") ||
    str.includes("#") ||
    str.includes('"') ||
    str.includes("'") ||
    str.startsWith("{") ||
    str.startsWith("[") ||
    str.startsWith("&") ||
    str.startsWith("*") ||
    str.startsWith("!") ||
    str.startsWith("%") ||
    str.startsWith("@") ||
    str.startsWith("`")
  ) {
    return '"' + str.replace(/\\/g, "\\\\").replace(/"/g, '\\"') + '"';
  }
  return '"' + str + '"';
}

async function generateWithAPI(body: string): Promise<string | null> {
  if (!anthropic) return null;
  const message = await anthropic.messages.create({
    model: MODEL,
    max_tokens: 100,
    messages: [
      {
        role: "user",
        content: `Write a meta description for this blog post in under 160 characters. Be concise and compelling. Return only the description text, no quotes, no preamble.\n\n${body}`,
      },
    ],
  });
  const block = message.content[0];
  if (block.type === "text") {
    return block.text.trim().replace(/^["']|["']$/g, "");
  }
  return null;
}

function insertDescription(
  frontmatter: string,
  description: string
): string {
  const lines = frontmatter.split("\n");
  const titleIndex = lines.findIndex((l) => /^title:/i.test(l));
  const insertAt = titleIndex >= 0 ? titleIndex + 1 : lines.length;
  lines.splice(insertAt, 0, `description: ${escapeYamlString(description)}`);
  return lines.join("\n");
}

function delay(ms: number): Promise<void> {
  return new Promise((resolve) => setTimeout(resolve, ms));
}

async function main() {
  const files = await findMarkdownFiles(CONTENT_DIR);
  console.log(`Found ${files.length} markdown files in ${CONTENT_DIR}\n`);

  let processed = 0;
  let skipped = 0;
  let apiCalls = 0;
  let errors = 0;

  for (const filePath of files) {
    const fileName = basename(filePath);
    const content = await readFile(filePath, "utf-8");
    const parsed = parseFrontmatter(content);

    if (!parsed) {
      console.log(`  SKIP ${fileName} — no frontmatter found`);
      skipped++;
      continue;
    }

    if (hasDescription(parsed.frontmatter)) {
      console.log(`  SKIP ${fileName} — already has description`);
      skipped++;
      continue;
    }

    const wordCount = countWords(parsed.body);
    let description: string;
    let method: string;

    if (wordCount < 300) {
      description = extractFirstParagraph(parsed.body);
      method = "first-paragraph";
      if (!description) {
        console.log(`  SKIP ${fileName} — no extractable content`);
        skipped++;
        continue;
      }
    } else {
      if (!anthropic) {
        console.log(
          `  SKIP ${fileName} — ${wordCount} words but no API key available`
        );
        skipped++;
        continue;
      }
      try {
        if (apiCalls > 0) {
          await delay(API_DELAY_MS);
        }
        const result = await generateWithAPI(parsed.body);
        apiCalls++;
        if (!result) {
          console.log(`  ERROR ${fileName} — API returned no text`);
          errors++;
          continue;
        }
        description = result;
        method = "API";
      } catch (err: any) {
        console.log(
          `  ERROR ${fileName} — API call failed: ${err.message ?? err}`
        );
        errors++;
        continue;
      }
    }

    const newFrontmatter = insertDescription(parsed.frontmatter, description);
    const newContent = `---\n${newFrontmatter}\n---\n${parsed.body}`;
    await writeFile(filePath, newContent, "utf-8");

    console.log(`  OK   ${fileName} [${method}] → ${description}`);
    processed++;
  }

  console.log(`\nDone.`);
  console.log(
    `  Processed: ${processed} | Skipped: ${skipped} | Errors: ${errors} | API calls: ${apiCalls}`
  );
}

main().catch((err) => {
  console.error("Fatal error:", err);
  process.exit(1);
});
