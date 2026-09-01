import { execFileSync } from 'child_process';
import path from 'path';
import { fileURLToPath } from 'url';
import matter from 'gray-matter';
import fs from 'fs';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const REPO_ROOT = path.join(__dirname, '..');
const POSTS_DIR = path.join(REPO_ROOT, 'src', 'content', 'posts');

const HOST = 'nathanpitman.com';
const KEY = '6f93e6502d1e50b3eaefe14dbe49c64c';
const KEY_LOCATION = `https://${HOST}/${KEY}.txt`;
const ENDPOINT = 'https://api.indexnow.org/indexnow';

const NULL_SHA = '0000000000000000000000000000000000000000';

function changedPostFiles(base, head) {
  if (!base || base === NULL_SHA) return null;

  const output = execFileSync(
    'git',
    ['diff', '--name-only', '--diff-filter=ACMR', base, head, '--', 'src/content/posts'],
    { cwd: REPO_ROOT, encoding: 'utf8' }
  );

  return output
    .split('\n')
    .map(line => line.trim())
    .filter(line => line.endsWith('.md'));
}

function urlsForChangedFiles(files) {
  const urls = [];

  for (const file of files) {
    const absPath = path.join(REPO_ROOT, file);
    if (!fs.existsSync(absPath)) continue; // deleted file

    const { data } = matter(fs.readFileSync(absPath, 'utf8'));
    if (data.hidden) continue;

    const slug = path.basename(file, '.md');
    urls.push(`https://${HOST}/posts/${slug}`);
  }

  return urls;
}

async function submit(urlList) {
  const response = await fetch(ENDPOINT, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json; charset=utf-8' },
    body: JSON.stringify({ host: HOST, key: KEY, keyLocation: KEY_LOCATION, urlList }),
  });

  const body = await response.text();
  console.log(`IndexNow responded ${response.status}: ${body || '(empty body)'}`);

  if (!response.ok) {
    throw new Error(`IndexNow submission failed with status ${response.status}`);
  }
}

async function run() {
  const [base, head] = process.argv.slice(2);

  if (!head) {
    console.error('Usage: node scripts/submit-indexnow.mjs <base-ref> <head-ref>');
    process.exit(1);
  }

  const files = changedPostFiles(base, head);
  if (files === null) {
    console.log('No usable base ref (first push or force-push) — skipping IndexNow submission.');
    return;
  }

  const urls = urlsForChangedFiles(files);
  if (urls.length === 0) {
    console.log('No post changes detected — skipping IndexNow submission.');
    return;
  }

  console.log(`Submitting ${urls.length} URL(s) to IndexNow:\n${urls.join('\n')}`);
  await submit(urls);
}

run().catch(err => {
  console.error(err.message);
  process.exit(1);
});
