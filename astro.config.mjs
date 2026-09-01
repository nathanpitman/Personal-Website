import { defineConfig } from 'astro/config';
import sitemap from '@astrojs/sitemap';
import pagefind from 'astro-pagefind';

export default defineConfig({
  site: 'https://nathanpitman.com',
  output: 'static',
  trailingSlash: 'never',
  build: {
    format: 'file',
  },
  legacy: {
    collections: true,
  },
  redirects: {
    '/tag/consoles': '/tag/gaming',
    '/tag/games': '/tag/gaming',
    '/tag/linux': '/tag/technology',
    '/tag/web-applications': '/tag/web-development',
  },
  markdown: {
    shikiConfig: {
      theme: 'github-light',
    },
  },
  integrations: [
    sitemap({
      filter: (page) => {
        const { pathname } = new URL(page);
        if (pathname.startsWith('/category/')) return false;
        if (/^\/posts\/\d{4}-\d{2}-\d{2}-/.test(pathname)) return false;
        if (/^\/\d+\/[^/]+$/.test(pathname)) return false;
        if (/^\/journal\/\d+\/[^/]+$/.test(pathname)) return false;
        return true;
      },
    }),
    pagefind(),
  ],
  server: {
    host: '0.0.0.0',
    port: parseInt(process.env.PORT) || 5000,
    allowedHosts: true,
  },
  vite: {
    server: {
      allowedHosts: true,
    },
  },
});
