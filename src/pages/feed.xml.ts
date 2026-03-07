import rss from '@astrojs/rss';
import { getCollection } from 'astro:content';

export async function GET(context: any) {
  const posts = await getCollection('posts');
  const sorted = posts.sort((a, b) => b.data.date.getTime() - a.data.date.getTime());

  return rss({
    title: 'Nathan Pitman',
    description: 'Journal entries from nathanpitman.com',
    site: context.site,
    items: sorted.slice(0, 20).map(post => ({
      title: post.data.title,
      pubDate: post.data.date,
      link: `/posts/${post.id.replace(/\.md$/, '')}/`,
    })),
  });
}
