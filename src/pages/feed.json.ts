import { getCollection } from 'astro:content';

export async function GET(context: any) {
  const posts = await getCollection('posts');
  const sorted = posts.sort((a, b) => b.data.date.getTime() - a.data.date.getTime());
  const siteUrl = context.site.toString().replace(/\/$/, '');

  const feed = {
    version: 'https://jsonfeed.org/version/1.1',
    title: 'Nathan Pitman',
    home_page_url: siteUrl,
    feed_url: `${siteUrl}/feed.json`,
    description: 'Journal entries from nathanpitman.com',
    items: sorted.slice(0, 20).map(post => ({
      id: `${siteUrl}/posts/${post.slug}/`,
      url: `${siteUrl}/posts/${post.slug}/`,
      title: post.data.title,
      date_published: post.data.date.toISOString(),
    })),
  };

  return new Response(JSON.stringify(feed, null, 2), {
    headers: { 'Content-Type': 'application/json' },
  });
}
