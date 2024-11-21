import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import path from 'path'; // Import Node.js path module

export default defineConfig({
    plugins: [react()], // Enables React plugin for JSX support
    server: {
        hmr: {
            overlay: false, // Suppress error overlay in development
        },
        port: 5173, // Set a custom port
        open: true, // Automatically open the app in the browser
    },
    resolve: {
        alias: {
            '@': path.resolve(__dirname, './src') // Simplifies imports with '@/path/to/file'
        },
    },
    build: {
        outDir: 'dist', // Build output directory
        sourcemap: true, // Include source maps for debugging
    },
});
