import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import tailwindcss from '@tailwindcss/vite';

export default defineConfig({
  // Relative asset paths, so the build works at username.github.io and at username.github.io/repo/
  base: './',
  plugins: [react(), tailwindcss()],
});
