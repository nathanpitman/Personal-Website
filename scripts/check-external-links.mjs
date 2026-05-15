/**
 * External link auditor + fixer for nathanpitman.com posts.
 *
 * Checks every external link (excluding nathanpitman.com self-links, which are
 * handled by fix-self-links.mjs) against HTTP, queries the Wayback Machine for
 * dead links, and optionally patches the posts in-place.
 *
 * Usage:
 *   node scripts/check-external-links.mjs           # check only, produce report
 *   node scripts/check-external-links.mjs --fix      # check + replace dead links with archive URLs
 *   node scripts/check-external-links.mjs --fix --dry-run   # show what --fix would do
 *
 * Output files (created regardless of --fix):
 *   scripts/external-link-results.json   — full results
 *   scripts/external-link-report.md      — human-readable report
 *
 * Requirements: Node 18+ (native fetch). No npm packages needed.
 *
 * Tips for running quickly:
 *   - Set CONCURRENCY=30 env var to check links faster on a fast connection.
 *   - Set TIMEOUT=8000 (ms) to use a shorter per-request timeout.
 *   - Pipe output through `tee` to keep a log: node ... | tee audit.log
 */

import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const POSTS_DIR = path.resolve(__dirname, '../src/content/posts');
const RESULTS_FILE = path.resolve(__dirname, 'external-link-results.json');
const REPORT_FILE = path.resolve(__dirname, 'external-link-report.md');

const FIX_MODE = process.argv.includes('--fix');
const DRY_RUN = process.argv.includes('--dry-run');
const CONCURRENCY = parseInt(process.env.CONCURRENCY ?? '20');
const FETCH_TIMEOUT_MS = parseInt(process.env.TIMEOUT ?? '12000');
const WAYBACK_TIMEOUT_MS = 10000;

// ---------------------------------------------------------------------------
// Domain / parking detection
// ---------------------------------------------------------------------------

const PARKING_DOMAINS = new Set([
  'sedoparking.com', 'sedo.com', 'bodis.com', 'parking.com',
  'afternic.com', 'hugedomains.com', 'undeveloped.com',
  'dan.com', 'uniregistry.com', 'buydomains.com',
  'domainmarket.com', 'namesilo.com', 'namecheap.com',
  'above.com', 'domainnamesales.com', 'parkingcrew.net',
  'smartname.com', 'trellian.com', 'skenzo.com',
  'system.com', 'namedrive.com', 'cashparking.com', 'domainsponsor.com',
  'godaddy.com', 'networksolutions.com',
]);

const PARKING_TITLE_RX = [
  /domain (for sale|is for sale|parked|parking)/i,
  /buy this domain/i,
  /this domain (may be|is) for sale/i,
  /parked (free|domain|page)/i,
  /web hosting - courtesy of/i,
  /domain expired/i,
  /\bfor sale\b/i,
];

function hostname(url) {
  try { return new URL(url).hostname.replace(/^www\./, ''); } catch { return null; }
}

function domainsRelated(a, b) {
  if (!a || !b || a === b) return !(!a || !b) || a === b;
  return a.endsWith('.' + b) || b.endsWith('.' + a);
}

// ---------------------------------------------------------------------------
// HTTP checking
// ---------------------------------------------------------------------------

async function fetchWithTimeout(url, options = {}, ms = FETCH_TIMEOUT_MS) {
  const ctrl = new AbortController();
  const timer = setTimeout(() => ctrl.abort(), ms);
  try {
    return await fetch(url, { ...options, signal: ctrl.signal });
  } finally {
    clearTimeout(timer);
  }
}

async function checkLink(url) {
  const origHost = hostname(url);
  const result = { url, origHost, status: null, finalUrl: null, finalHost: null, title: null, error: null };
  try {
    const resp = await fetchWithTimeout(url, {
      redirect: 'follow',
      headers: {
        'User-Agent': 'Mozilla/5.0 (X11; Linux x86_64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/124.0 Safari/537.36',
        'Accept': 'text/html,application/xhtml+xml,*/*;q=0.8',
        'Accept-Language': 'en-GB,en;q=0.9',
      },
    });
    result.status = resp.status;
    result.finalUrl = resp.url;
    result.finalHost = hostname(resp.url);

    if (resp.ok) {
      const reader = resp.body.getReader();
      let html = '';
      while (html.length < 8192) {
        const { done, value } = await reader.read();
        if (done) break;
        html += new TextDecoder().decode(value);
        if (html.includes('</title>')) break;
      }
      reader.cancel().catch(() => {});
      const m = html.match(/<title[^>]*>([^<]{1,300})<\/title>/i);
      result.title = m ? m[1].replace(/\s+/g, ' ').trim() : null;
    }
  } catch (err) {
    result.error = err.name === 'AbortError' ? 'TIMEOUT' : err.message;
  }
  return result;
}

// ---------------------------------------------------------------------------
// Classification
// ---------------------------------------------------------------------------

function classify(r) {
  if (r.error) return r.error === 'TIMEOUT' ? 'timeout' : 'dead';
  if (r.status >= 400) return 'dead';

  const parkedHost = r.finalHost && PARKING_DOMAINS.has(r.finalHost);
  const parkedTitle = r.title && PARKING_TITLE_RX.some(rx => rx.test(r.title));
  if (parkedHost || parkedTitle) return 'hijacked';

  const domainChanged = r.finalHost && !domainsRelated(r.origHost, r.finalHost);
  if (domainChanged) return 'redirected';

  return 'ok';
}

// ---------------------------------------------------------------------------
// Wayback Machine
// ---------------------------------------------------------------------------

async function getWaybackSnapshot(url) {
  try {
    const api = `https://archive.org/wayback/available?url=${encodeURIComponent(url)}`;
    const resp = await fetchWithTimeout(api, {}, WAYBACK_TIMEOUT_MS);
    if (!resp.ok) return null;
    const data = await resp.json();
    return data?.archived_snapshots?.closest?.url ?? null;
  } catch {
    return null;
  }
}

// ---------------------------------------------------------------------------
// Link extraction
// ---------------------------------------------------------------------------

function extractExternalLinks() {
  const linkMap = new Map(); // url → Set<filename>
  const files = fs.readdirSync(POSTS_DIR).filter(f => f.endsWith('.md'));

  for (const file of files) {
    const raw = fs.readFileSync(path.join(POSTS_DIR, file), 'utf8');
    // Only scan the body (after frontmatter)
    const bodyStart = raw.indexOf('\n---\n', raw.indexOf('---'));
    const body = bodyStart > -1 ? raw.slice(bodyStart + 5) : raw;

    for (const m of body.matchAll(/https?:\/\/[^\s)"<>\]]+/g)) {
      const url = m[0].replace(/[.,;:!?']+$/, '');
      // Skip already-archived links and self-links
      if (url.includes('web.archive.org')) continue;
      if (url.includes('nathanpitman.com')) continue;
      if (!linkMap.has(url)) linkMap.set(url, new Set());
      linkMap.get(url).add(file);
    }
  }
  return linkMap;
}

// ---------------------------------------------------------------------------
// Concurrency pool
// ---------------------------------------------------------------------------

async function runPool(tasks, limit) {
  const results = new Array(tasks.length);
  let idx = 0;
  async function worker() {
    while (idx < tasks.length) {
      const i = idx++;
      results[i] = await tasks[i]();
    }
  }
  await Promise.all(Array.from({ length: Math.min(limit, tasks.length) }, worker));
  return results;
}

// ---------------------------------------------------------------------------
// Apply fixes to posts
// ---------------------------------------------------------------------------

function applyFixes(fixMap) {
  // fixMap: Map<oldUrl, newUrl>
  let filesChanged = 0;
  let replacements = 0;

  const files = fs.readdirSync(POSTS_DIR).filter(f => f.endsWith('.md'));
  for (const file of files) {
    const filePath = path.join(POSTS_DIR, file);
    const raw = fs.readFileSync(filePath, 'utf8');
    const fmMatch = raw.match(/^---\n([\s\S]*?\n)---\n([\s\S]*)$/);
    if (!fmMatch) continue;
    const [, fm, body] = fmMatch;

    let newBody = body;
    let changed = false;
    for (const [oldUrl, newUrl] of fixMap) {
      if (newBody.includes(oldUrl)) {
        newBody = newBody.split(oldUrl).join(newUrl);
        changed = true;
        replacements++;
        if (DRY_RUN) console.log(`[DRY] ${file}: ${oldUrl}\n      → ${newUrl}`);
      }
    }

    if (changed) {
      filesChanged++;
      if (!DRY_RUN) {
        fs.writeFileSync(filePath, `---\n${fm}---\n${newBody}`, 'utf8');
        console.log(`Fixed: ${file}`);
      }
    }
  }
  return { filesChanged, replacements };
}

// ---------------------------------------------------------------------------
// Markdown report
// ---------------------------------------------------------------------------

function writeReport(ok, dead, hijacked, redirected) {
  const lines = [];
  lines.push('# External Link Audit Report');
  lines.push(`\n_Generated: ${new Date().toISOString().slice(0, 10)}_\n`);
  lines.push('| Category | Count |');
  lines.push('|---|---|');
  lines.push(`| OK | ${ok.length} |`);
  lines.push(`| Dead / unreachable | ${dead.length} |`);
  lines.push(`| Hijacked / parked | ${hijacked.length} |`);
  lines.push(`| Redirected to different domain | ${redirected.length} |`);

  if (dead.length > 0) {
    lines.push('\n---\n');
    lines.push('## Dead / Unreachable Links\n');
    const withArch = dead.filter(r => r.waybackUrl);
    const noArch = dead.filter(r => !r.waybackUrl);

    if (withArch.length > 0) {
      lines.push(`### Links with Wayback Machine snapshot (${withArch.length})\n`);
      lines.push('These were automatically replaced in the posts when run with `--fix`.\n');
      for (const r of withArch.sort((a, b) => a.url.localeCompare(b.url))) {
        lines.push(`**Original:** \`${r.url}\``);
        lines.push(`**Archive:** ${r.waybackUrl}`);
        lines.push(`**Status:** ${r.error ?? r.status} — in: ${r.files.join(', ')}\n`);
      }
    }

    if (noArch.length > 0) {
      lines.push(`### Links with no archive (${noArch.length})\n`);
      lines.push('These are completely gone — no Wayback Machine snapshot found.\n');
      for (const r of noArch.sort((a, b) => a.url.localeCompare(b.url))) {
        lines.push(`- \`${r.url}\` — ${r.error ?? r.status} — in: ${r.files.join(', ')}`);
      }
    }
  }

  if (hijacked.length > 0) {
    lines.push('\n---\n');
    lines.push('## Hijacked / Parked Domains\n');
    lines.push('These return HTTP 200 but the domain is parked, for-sale, or serving unrelated content. **Please validate each before deciding what to do.**\n');
    for (const r of hijacked.sort((a, b) => a.url.localeCompare(b.url))) {
      lines.push(`**URL:** \`${r.url}\``);
      lines.push(`**Final URL:** ${r.finalUrl}`);
      lines.push(`**Page title:** ${r.title ?? '(none)'}`);
      lines.push(`**In posts:** ${r.files.join(', ')}\n`);
    }
  }

  if (redirected.length > 0) {
    lines.push('\n---\n');
    lines.push('## Redirected to Different Domain\n');
    lines.push('May be a legitimate site migration, or may indicate a hijack. **Please validate.**\n');
    for (const r of redirected.sort((a, b) => a.url.localeCompare(b.url))) {
      lines.push(`**Original:** \`${r.url}\``);
      lines.push(`**Redirects to:** \`${r.finalUrl}\``);
      lines.push(`**Page title:** ${r.title ?? '(none)'}`);
      lines.push(`**In posts:** ${r.files.join(', ')}\n`);
    }
  }

  fs.writeFileSync(REPORT_FILE, lines.join('\n'));
  console.log(`\nReport: ${REPORT_FILE}`);
}

// ---------------------------------------------------------------------------
// Main
// ---------------------------------------------------------------------------

async function main() {
  console.log('Extracting external links from post bodies…');
  const linkMap = extractExternalLinks();
  const urls = [...linkMap.keys()];
  console.log(`Found ${urls.length} unique external links.\n`);

  // Check all links
  let checked = 0;
  const checkTasks = urls.map(url => async () => {
    const result = await checkLink(url);
    result.files = [...linkMap.get(url)];
    if (++checked % 50 === 0) process.stdout.write(`  Checked ${checked}/${urls.length}\n`);
    return result;
  });

  console.log(`Checking ${urls.length} links (concurrency=${CONCURRENCY})…`);
  const raw = await runPool(checkTasks, CONCURRENCY);
  for (const r of raw) r.classification = classify(r);

  const dead = raw.filter(r => r.classification === 'dead' || r.classification === 'timeout');
  const hijacked = raw.filter(r => r.classification === 'hijacked');
  const redirected = raw.filter(r => r.classification === 'redirected');
  const ok = raw.filter(r => r.classification === 'ok');

  console.log(`\nResults: ${ok.length} ok · ${dead.length} dead · ${hijacked.length} hijacked · ${redirected.length} redirected\n`);

  // Wayback snapshots for dead links
  if (dead.length > 0) {
    let wb = 0;
    console.log(`Querying Wayback Machine for ${dead.length} dead links…`);
    await runPool(dead.map(r => async () => {
      r.waybackUrl = await getWaybackSnapshot(r.url);
      if (++wb % 20 === 0) process.stdout.write(`  Wayback: ${wb}/${dead.length}\n`);
    }), 8);
    const found = dead.filter(r => r.waybackUrl).length;
    console.log(`Wayback snapshots found: ${found}/${dead.length}\n`);
  }

  // Save full JSON
  fs.writeFileSync(RESULTS_FILE, JSON.stringify(raw, null, 2));
  console.log(`Full results: ${RESULTS_FILE}`);

  // Optionally apply fixes (dead links → archive URLs)
  if (FIX_MODE) {
    const fixMap = new Map();
    for (const r of dead) {
      if (r.waybackUrl) fixMap.set(r.url, r.waybackUrl);
    }
    if (fixMap.size > 0) {
      console.log(`\nApplying ${fixMap.size} archive-link replacements…`);
      const { filesChanged, replacements } = applyFixes(fixMap);
      console.log(`Changed: ${filesChanged} files, ${replacements} replacements`);
    } else {
      console.log('No dead links with archive snapshots — nothing to fix.');
    }
  }

  writeReport(ok, dead, hijacked, redirected);

  console.log('\n=== SUMMARY ===');
  console.log(`OK:          ${ok.length}`);
  console.log(`Dead:        ${dead.length} (${dead.filter(r => r.waybackUrl).length} have Wayback snapshot)`);
  console.log(`Hijacked:    ${hijacked.length}`);
  console.log(`Redirected:  ${redirected.length}`);
}

main().catch(err => { console.error(err); process.exit(1); });
