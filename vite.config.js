import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

export default defineConfig({
  plugins: [react()],
  build: {
    outDir: 'dist',
    rollupOptions: { input: { main: 'index.html', privacy: 'privacy.html', emailCheck: 'email-check/index.html',
      microsoft365: 'microsoft-365/index.html', websites: 'websites/index.html', aiDashboards: 'ai-dashboards/index.html' } }
  }
});
