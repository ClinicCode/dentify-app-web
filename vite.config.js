import { defineConfig } from 'vite';
import vue from '@vitejs/plugin-vue'
import path from 'path';

export default defineConfig({
    plugins: [vue()],
    resolve: {
        alias: {
            '@': path.resolve(__dirname, './src'),
        },
    },
    server: {
        proxy: {
            '/api': {
                target: 'https://dentify-f0gdbubtaafmdfg9.canadacentral-01.azurewebsites.net',
                changeOrigin: true,
                secure: false,
            },
        },
    },
});
