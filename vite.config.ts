import react from '@vitejs/plugin-react';
import { defineConfig, loadEnv } from 'vite';

// https://vitejs.dev/config/
export default defineConfig(({ mode }) => {
  const env = loadEnv(mode, process.cwd());

  const PORT: number = parseInt(env.VITE_PORT as string) || 5000;

  return {
    plugins: [react()],
    server: { port: PORT },
  };
});
