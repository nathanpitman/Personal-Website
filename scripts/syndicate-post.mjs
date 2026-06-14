import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';
import matter from 'gray-matter';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const POSTS_DIR = path.join(__dirname, '..', 'src', 'content', 'posts');
const SITE_URL = 'https://nathanpitman.com';

const slug = process.env.POST_SLUG;
const dryRun = process.env.DRY_RUN === 'true';

if (!slug) {
  console.error('POST_SLUG environment variable is required.');
  process.exit(1);
}

const postPath = path.join(POSTS_DIR, `${slug}.md`);
if (!fs.existsSync(postPath)) {
  console.error(`Post not found: ${postPath}`);
  process.exit(1);
}

const { data } = matter(fs.readFileSync(postPath, 'utf-8'));
const title = data.title;
const description = data.description || '';
const postUrl = `${SITE_URL}/posts/${slug}/`;

function buildText(maxLength) {
  const suffix = `\n\n${postUrl}`;
  const intro = description ? `${title}\n\n${description}` : title;
  const introLimit = maxLength - suffix.length;
  const trimmedIntro =
    intro.length > introLimit
      ? `${intro.slice(0, introLimit - 1).trimEnd()}…`
      : intro;
  return `${trimmedIntro}${suffix}`;
}

async function postToBluesky() {
  const text = buildText(300);
  if (dryRun) {
    console.log(`[bluesky] would post:\n${text}\n`);
    return;
  }

  const identifier = process.env.BLUESKY_IDENTIFIER;
  const password = process.env.BLUESKY_APP_PASSWORD;
  if (!identifier || !password) {
    throw new Error('Missing BLUESKY_IDENTIFIER / BLUESKY_APP_PASSWORD secrets.');
  }

  const sessionRes = await fetch('https://bsky.social/xrpc/com.atproto.server.createSession', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ identifier, password }),
  });
  if (!sessionRes.ok) {
    throw new Error(`login failed: ${sessionRes.status} ${await sessionRes.text()}`);
  }
  const session = await sessionRes.json();

  // Facet byte ranges are UTF-8 offsets, not character offsets.
  const encoder = new TextEncoder();
  const byteStart = encoder.encode(text.slice(0, text.indexOf(postUrl))).length;
  const byteEnd = byteStart + encoder.encode(postUrl).length;
  const facets = [
    {
      index: { byteStart, byteEnd },
      features: [{ $type: 'app.bsky.richtext.facet#link', uri: postUrl }],
    },
  ];

  let embed;
  try {
    const imgRes = await fetch(`${SITE_URL}/avatar.jpg`);
    if (imgRes.ok) {
      const blobRes = await fetch('https://bsky.social/xrpc/com.atproto.repo.uploadBlob', {
        method: 'POST',
        headers: {
          'Content-Type': imgRes.headers.get('content-type') || 'image/jpeg',
          Authorization: `Bearer ${session.accessJwt}`,
        },
        body: Buffer.from(await imgRes.arrayBuffer()),
      });
      if (blobRes.ok) {
        const { blob } = await blobRes.json();
        embed = {
          $type: 'app.bsky.embed.external',
          external: { uri: postUrl, title, description: description || title, thumb: blob },
        };
      }
    }
  } catch (err) {
    console.warn(`[bluesky] could not build preview card, posting without it: ${err.message}`);
  }

  const postRes = await fetch('https://bsky.social/xrpc/com.atproto.repo.createRecord', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${session.accessJwt}`,
    },
    body: JSON.stringify({
      repo: session.did,
      collection: 'app.bsky.feed.post',
      record: {
        $type: 'app.bsky.feed.post',
        text,
        facets,
        createdAt: new Date().toISOString(),
        ...(embed && { embed }),
      },
    }),
  });
  if (!postRes.ok) {
    throw new Error(`post failed: ${postRes.status} ${await postRes.text()}`);
  }
  const result = await postRes.json();
  console.log(`[bluesky] posted: ${result.uri}`);
}

async function postToMastodon() {
  const text = buildText(500);
  if (dryRun) {
    console.log(`[mastodon] would post:\n${text}\n`);
    return;
  }

  const instance = process.env.MASTODON_INSTANCE_URL;
  const token = process.env.MASTODON_ACCESS_TOKEN;
  if (!instance || !token) {
    throw new Error('Missing MASTODON_INSTANCE_URL / MASTODON_ACCESS_TOKEN secrets.');
  }

  const res = await fetch(`${instance.replace(/\/$/, '')}/api/v1/statuses`, {
    method: 'POST',
    headers: {
      Authorization: `Bearer ${token}`,
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({ status: text, visibility: 'public' }),
  });
  if (!res.ok) {
    throw new Error(`post failed: ${res.status} ${await res.text()}`);
  }
  const result = await res.json();
  console.log(`[mastodon] posted: ${result.url}`);
}

async function postToThreads() {
  const text = buildText(500);
  if (dryRun) {
    console.log(`[threads] would post:\n${text}\n`);
    return;
  }

  const userId = process.env.THREADS_USER_ID;
  const token = process.env.THREADS_ACCESS_TOKEN;
  if (!userId || !token) {
    throw new Error('Missing THREADS_USER_ID / THREADS_ACCESS_TOKEN secrets.');
  }

  const createRes = await fetch(`https://graph.threads.net/v1.0/${userId}/threads`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ media_type: 'TEXT', text, access_token: token }),
  });
  if (!createRes.ok) {
    throw new Error(`container creation failed: ${createRes.status} ${await createRes.text()}`);
  }
  const { id: creationId } = await createRes.json();

  // Threads needs a moment to process the container before it can be published.
  await new Promise((resolve) => setTimeout(resolve, 5000));

  const publishRes = await fetch(`https://graph.threads.net/v1.0/${userId}/threads_publish`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ creation_id: creationId, access_token: token }),
  });
  if (!publishRes.ok) {
    throw new Error(`publish failed: ${publishRes.status} ${await publishRes.text()}`);
  }
  const result = await publishRes.json();
  console.log(`[threads] posted: ${result.id}`);
}

const platforms = [
  { name: 'bluesky', enabled: process.env.PLATFORM_BLUESKY === 'true', handler: postToBluesky },
  { name: 'mastodon', enabled: process.env.PLATFORM_MASTODON === 'true', handler: postToMastodon },
  { name: 'threads', enabled: process.env.PLATFORM_THREADS === 'true', handler: postToThreads },
].filter((p) => p.enabled);

if (platforms.length === 0) {
  console.error('No platforms selected.');
  process.exit(1);
}

console.log(`Syndicating "${title}" (${postUrl}) to: ${platforms.map((p) => p.name).join(', ')}${dryRun ? ' [dry run]' : ''}\n`);

const failures = [];
for (const platform of platforms) {
  try {
    await platform.handler();
  } catch (err) {
    console.error(`[${platform.name}] failed: ${err.message}`);
    failures.push(platform.name);
  }
}

if (failures.length > 0) {
  console.error(`\nFailed: ${failures.join(', ')}`);
  process.exit(1);
}

console.log('\nDone.');
