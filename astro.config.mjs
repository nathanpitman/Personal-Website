import { defineConfig } from 'astro/config';
import sitemap from '@astrojs/sitemap';
import pagefind from 'astro-pagefind';

export default defineConfig({
  site: 'https://nathanpitman.com',
  output: 'static',
  integrations: [sitemap(), pagefind()],
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
