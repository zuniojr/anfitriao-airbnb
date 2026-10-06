import { defineConfig } from 'astro/config';
import vercel from '@astrojs/vercel';
import react from '@astrojs/react';
import tailwind from '@astrojs/tailwind';

// https://astro.build/config
export default defineConfig({
  site: 'https://anfitrioesairbnb.com/',
  output: 'hybrid',
  adapter: vercel(),
  integrations: [
    react(),
    tailwind({
      // Aplica Tailwind apenas às páginas admin, sem interferir no CSS do site público
      applyBaseStyles: false,
    }),
  ],
  vite: {
    optimizeDeps: {
      include: ['marked'],
    },
  },
});
