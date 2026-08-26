import { defineConfig } from 'astro/config';
import vercel from '@astrojs/vercel/static';

export default defineConfig({
  output: 'static',
  adapter: vercel(),
  site: 'https://freshbarbershop.vercel.app', // cambia a tu dominio real
});
