import { defineConfig } from 'astro/config';

export default defineConfig({
  site: 'https://nathanpitman.github.io',
  output: 'static',
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
