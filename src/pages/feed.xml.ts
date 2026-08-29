import rss from '@astrojs/rss';
import { getCollection } from 'astro:content';
import { getDescription } from '../utils/description';
import { isPublished } from '../utils/published';

export async function GET(context: any) {
  const posts = await getCollection('posts');
  const visible = posts.filter(isPublished);
  const sorted = visible.sort((a, b) => b.data.date.getTime() - a.data.date.getTime());
  const siteUrl = context.site.toString().replace(/\/$/, '');
  const avatarUrl = `${siteUrl}/avatar.jpg`;

  return rss({
    title: 'Nathan Pitman',
    description: 'Journal entries from nathanpitman.com',
    site: context.site,
    customData: `<image><url>${avatarUrl}</url><title>Nathan Pitman</title><link>${siteUrl}</link></image>`,
    items: sorted.slice(0, 20).map(post => ({
      title: post.data.title,
      description: getDescription(post),
      pubDate: post.data.date,
      link: `/posts/${post.slug}/`,
    })),
  });
}
