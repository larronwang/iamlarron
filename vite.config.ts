import path from 'path';
import { defineConfig, loadEnv } from 'vite';
import react from '@vitejs/plugin-react';

export default defineConfig(({ mode }) => {
    const env = loadEnv(mode, '.', '');
    return {
        // --- 关键修改：添加 base 路径 ---
        base: '/', // 将基路径设置为根目录，解决 Vercel 上资源加载失败的问题。

        server: {
            port: 3000,
            // 部署时不再需要明确指定 host
            // host: '0.0.0.0', 
        },
        plugins: [react()],
        define: {
            'process.env.API_KEY': JSON.stringify(env.GEMINI_API_KEY),
            'process.env.GEMINI_API_KEY': JSON.stringify(env.GEMINI_API_KEY)
        },
        resolve: {
            alias: {
                '@': path.resolve(__dirname, '.'),
            }
        }
    };
});
