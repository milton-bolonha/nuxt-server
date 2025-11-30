#!/usr/bin/env node

const fs = require('fs');
const path = require('path');
const { execSync } = require('child_process');

console.log('📦 [COPY PDFs] Iniciando cópia de PDFs...');

const sourceDir = path.join(process.cwd(), 'server', 'bills');
const outputDir = path.join(process.cwd(), '.output', 'server', 'bills');
const netlifyDir = path.join(process.cwd(), '.netlify', 'functions-internal', 'server', 'bills');

console.log('📂 [COPY PDFs] Source:', sourceDir);
console.log('📂 [COPY PDFs] Output:', outputDir);
console.log('📂 [COPY PDFs] Netlify:', netlifyDir);

// Verificar se o diretório source existe
if (!fs.existsSync(sourceDir)) {
    console.error(`❌ [COPY PDFs] Diretório source não existe: ${sourceDir}`);
    process.exit(1);
}

// Função para copiar recursivamente
function copyRecursive(src, dest) {
    if (!fs.existsSync(dest)) {
        fs.mkdirSync(dest, { recursive: true });
    }
    
    const entries = fs.readdirSync(src, { withFileTypes: true });
    
    for (const entry of entries) {
        const srcPath = path.join(src, entry.name);
        const destPath = path.join(dest, entry.name);
        
        if (entry.isDirectory()) {
            copyRecursive(srcPath, destPath);
        } else {
            fs.copyFileSync(srcPath, destPath);
        }
    }
}

try {
    // Copiar para .output/server/bills
    console.log('📋 [COPY PDFs] Copiando para .output/server/bills...');
    copyRecursive(sourceDir, outputDir);
    console.log('✅ [COPY PDFs] PDFs copiados para .output/server/bills');
    
    // Copiar para .netlify/functions-internal/server/bills (se o diretório existir)
    if (fs.existsSync(path.dirname(netlifyDir))) {
        console.log('📋 [COPY PDFs] Copiando para .netlify/functions-internal/server/bills...');
        copyRecursive(sourceDir, netlifyDir);
        console.log('✅ [COPY PDFs] PDFs copiados para .netlify/functions-internal/server/bills');
    } else {
        console.log('⚠️ [COPY PDFs] Diretório .netlify/functions-internal/server não existe (será criado durante o build do Netlify)');
    }
    
    console.log('✅ [COPY PDFs] Concluído com sucesso!');
} catch (error) {
    console.error('❌ [COPY PDFs] Erro ao copiar PDFs:', error.message);
    process.exit(1);
}

