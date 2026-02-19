import { defineConfig } from 'vite';
import { resolve } from 'path';
import fs from 'fs';

export default defineConfig({
    build: {
        rollupOptions: {
            input: {
                main: resolve(__dirname, 'index.html'),
                admin: resolve(__dirname, 'admin.html'),
            },
        },
    },
    server: {
        open: '/',
    },
    plugins: [
        {
            name: 'spa-fallback',
            configureServer(server) {
                server.middlewares.use((req, res, next) => {
                    // Handle /admin route
                    if (req.url === '/admin' || req.url === '/admin/') {
                        req.url = '/admin.html';
                    }
                    next();
                });
            },
        },
    ],
});
