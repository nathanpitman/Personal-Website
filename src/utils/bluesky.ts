// Resolved once via:
// curl 'https://public.api.bsky.app/xrpc/com.atproto.identity.resolveHandle?handle=nathanpitman.com'
// A DID is permanent even if the handle changes, so it's safe to hardcode.
export const BLUESKY_DID = 'did:plc:gtbri77pwoo3vj5vtorxxilw';

export function parseBlueskyRkey(postUrl: string): string | null {
  const match = postUrl.match(/\/post\/([a-zA-Z0-9]+)\/?$/);
  return match ? match[1] : null;
}

export function buildAtUri(postUrl: string, did: string = BLUESKY_DID): string | null {
  const rkey = parseBlueskyRkey(postUrl);
  return rkey ? `at://${did}/app.bsky.feed.post/${rkey}` : null;
}
