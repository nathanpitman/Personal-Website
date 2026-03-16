import { defineConfig } from 'astro/config';
import sitemap from '@astrojs/sitemap';

export default defineConfig({
  site: 'https://nathanpitman.com',
  output: 'static',
  integrations: [sitemap()],
  server: {
    host: '0.0.0.0',
    port: 5000,
    allowedHosts: true,
  },
  vite: {
    server: {
      allowedHosts: true,
    },
  },
});
