import tailwindcss from "@tailwindcss/vite";
import { cpSync } from "node:fs";
import { join } from "node:path";

export default defineNuxtConfig({
    compatibilityDate: "2025-07-15",
    devtools: { enabled: true },
    modules: ["@pinia/nuxt"],
    srcDir: "app/",
    css: ["~/assets/css/main.css"],
    vite: {
        plugins: [tailwindcss()],
    },

    hooks: {
        // Hook para copiar os PDFs para o diretório de output do Nitro durante o build
        // Isso garante que os arquivos estejam disponíveis nas Netlify Functions
        "nitro:build:after": (nitro) => {
            console.log("📦 [BUILD] ========================================");
            console.log("📦 [BUILD] Iniciando cópia de PDFs para o bundle...");
            console.log("📦 [BUILD] ========================================");
            
            const sourceDir = join(process.cwd(), "server", "bills");
            const serverDir = nitro.options.output.serverDir;
            const targetDir = join(serverDir, "bills");
            
            console.log("📦 [BUILD] Source:", sourceDir);
            console.log("📦 [BUILD] Target:", targetDir);
            console.log("📦 [BUILD] Server Dir:", serverDir);
            
            try {
                // Verificar se o diretório source existe
                const { existsSync } = require("node:fs");
                if (!existsSync(sourceDir)) {
                    console.error(`❌ [BUILD] Diretório source não existe: ${sourceDir}`);
                    return;
                }
                
                // Copiar os PDFs para o diretório de output do servidor
                cpSync(sourceDir, targetDir, { recursive: true });
                console.log(`✅ [BUILD] PDFs copiados com sucesso!`);
                
                // Também copiar para o diretório das Netlify Functions
                const netlifyFunctionsDir = join(process.cwd(), ".netlify", "functions-internal", "server", "bills");
                try {
                    cpSync(sourceDir, netlifyFunctionsDir, { recursive: true });
                    console.log(`✅ [BUILD] PDFs também copiados para: ${netlifyFunctionsDir}`);
                } catch (netlifyError: any) {
                    console.log(`⚠️ [BUILD] Não foi possível copiar para Netlify Functions dir (pode não existir ainda): ${netlifyError?.message}`);
                }
            } catch (error: any) {
                console.error("❌ [BUILD] Erro ao copiar PDFs:", error?.message);
                console.error("❌ [BUILD] Stack:", error?.stack);
                // Não lançar erro para não quebrar o build, mas avisar
            }
            console.log("📦 [BUILD] ========================================");
        },
    },

    nitro: {
        preset: "netlify",
        devServer: {
            watch: [],
        },
        // Incluir o arquivo SQLite no bundle das functions
        serverAssets: [
            {
                baseName: "prisma",
                dir: "prisma",
            },
            {
                baseName: "bills",
                dir: "server/bills",
            },
        ],
    },

    app: {
        head: {
            meta: [
                {
                    "http-equiv": "X-Content-Type-Options",
                    content: "nosniff",
                },
                {
                    "http-equiv": "X-XSS-Protection",
                    content: "1; mode=block",
                },
            ],
        },
    },
    runtimeConfig: {
        tokenSecret: process.env.TOKEN_SECRET || "",
        tokenExpiry: process.env.TOKEN_EXPIRY || "5",
        allowedOrigins: process.env.ALLOWED_ORIGINS || "",
        openaiApiKey: process.env.OPENAI_API_KEY || "",
        vectorStoreId: process.env.VECTOR_STORE_ID || "",
        assistantId: process.env.ASSISTANT_ID || "",
        tavilyApiKey: process.env.TAVILY_API_KEY || "",
        trelloApiKey: process.env.TRELLO_API_KEY || "",
        trelloToken: process.env.TRELLO_TOKEN || "",
        nusaApiKey: process.env.NUSA_API_KEY || "",
        public: {
            isShutdown: false,
            shutdownPage: "/shutdown",
            sentryDsn: process.env.NUXT_PUBLIC_SENTRY_DSN || "",
            environment:
                process.env.NUXT_PUBLIC_ENVIRONMENT ||
                process.env.NODE_ENV ||
                "production",
            sentrySampleRate: parseFloat(
                process.env.NUXT_PUBLIC_SENTRY_SAMPLE_RATE || "1.0"
            ),
        },
    },
});
