#!/usr/bin/env node

/**
 * Script para fazer upload dos PDFs para o Netlify Blobs
 * 
 * Uso:
 *   NETLIFY_ACCESS_TOKEN=seu-token npm run upload-pdfs
 *   ou
 *   netlify login && npm run upload-pdfs
 */

import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';
import { execSync } from 'child_process';
import { getStore } from '@netlify/blobs';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Configuração
const PDFS_DIR = path.join(process.cwd(), 'server', 'bills');
const STORE_NAME = process.env.NETLIFY_BLOBS_STORE_NAME || 'pdfs';

console.log('📦 [UPLOAD PDFs] Iniciando upload para Netlify Blobs...');
console.log('📂 [UPLOAD PDFs] Diretório:', PDFS_DIR);
console.log('📦 [UPLOAD PDFs] Store:', STORE_NAME);

// Verificar se o diretório existe
if (!fs.existsSync(PDFS_DIR)) {
    console.error(`❌ [UPLOAD PDFs] Diretório não existe: ${PDFS_DIR}`);
    process.exit(1);
}

// Verificar se o token está configurado
const accessToken = process.env.NETLIFY_ACCESS_TOKEN || process.env.NETLIFY_AUTH_TOKEN;
if (!accessToken) {
    console.error('❌ [UPLOAD PDFs] NETLIFY_ACCESS_TOKEN não está configurado');
    console.error('   Configure com: set NETLIFY_ACCESS_TOKEN=seu-token (Windows)');
    console.error('   Ou: export NETLIFY_ACCESS_TOKEN=seu-token (Linux/Mac)');
    console.error('   Ou faça login: netlify login');
    process.exit(1);
}

// Função recursiva para encontrar todos os PDFs
function findPDFs(dir, baseDir = dir, files = []) {
    const entries = fs.readdirSync(dir, { withFileTypes: true });
    
    for (const entry of entries) {
        const fullPath = path.join(dir, entry.name);
        const relativePath = path.relative(baseDir, fullPath).replace(/\\/g, '/');
        
        if (entry.isDirectory()) {
            findPDFs(fullPath, baseDir, files);
        } else if (entry.name.endsWith('.pdf')) {
            files.push({
                fullPath,
                relativePath: relativePath.startsWith('bills/') ? relativePath : `bills/${relativePath}`
            });
        }
    }
    
    return files;
}

// Função para obter siteID
function getSiteID() {
    let siteID = process.env.NETLIFY_SITE_ID;

    // Se não tiver siteID, tentar obter via netlify status
    if (!siteID) {
        console.log('🔍 [UPLOAD PDFs] Tentando obter siteID do Netlify...');
        try {
            const statusOutput = execSync('netlify status --json', { encoding: 'utf-8', stdio: 'pipe' });
            const status = JSON.parse(statusOutput);
            if (status.siteId) {
                siteID = status.siteId;
                console.log(`✅ [UPLOAD PDFs] SiteID obtido: ${siteID}`);
            }
        } catch (e) {
            // Se netlify status falhar, continuar sem siteID
            console.log('⚠️ [UPLOAD PDFs] Não foi possível obter siteID do netlify status');
        }
    }

    // Se ainda não tiver siteID, pedir ao usuário
    if (!siteID) {
        console.error('❌ [UPLOAD PDFs] NETLIFY_SITE_ID não está configurado');
        console.error('   Você pode obter o siteID de duas formas:');
        console.error('   1. No dashboard do Netlify: Site settings > General > Site details > Site ID');
        console.error('   2. Ou configure: set NETLIFY_SITE_ID=seu-site-id');
        console.error('');
        console.error('   Exemplo: set NETLIFY_SITE_ID=abc123-def456-ghi789');
        process.exit(1);
    }

    return siteID;
}

async function uploadPDFs() {
    // Obter siteID antes de continuar
    const siteID = getSiteID();
    try {
        // Obter o store do Netlify Blobs
        // Quando executado localmente, precisa fornecer siteID e token explicitamente
        const storeConfig = {
            name: STORE_NAME,
            consistency: 'strong'
        };

        // Se não estiver no ambiente Netlify (local), fornecer credenciais explicitamente
        if (!process.env.NETLIFY) {
            storeConfig.siteID = siteID;
            storeConfig.token = accessToken;
            console.log('📦 [UPLOAD PDFs] Usando credenciais explícitas (ambiente local)');
        }

        const store = getStore(storeConfig);

        // Encontrar todos os PDFs
        console.log('🔍 [UPLOAD PDFs] Procurando PDFs...');
        const pdfFiles = findPDFs(PDFS_DIR);
        
        if (pdfFiles.length === 0) {
            console.log('⚠️ [UPLOAD PDFs] Nenhum PDF encontrado');
            return;
        }

        console.log(`📄 [UPLOAD PDFs] Encontrados ${pdfFiles.length} arquivos PDF`);

        // Fazer upload de cada PDF
        let successCount = 0;
        let errorCount = 0;

        for (const file of pdfFiles) {
            try {
                console.log(`📤 [UPLOAD PDFs] Enviando: ${file.relativePath}...`);
                
                const fileBuffer = fs.readFileSync(file.fullPath);
                
                await store.set(file.relativePath, fileBuffer, {
                    contentType: 'application/pdf'
                });
                
                console.log(`✅ [UPLOAD PDFs] Enviado: ${file.relativePath} (${(fileBuffer.length / 1024).toFixed(2)} KB)`);
                successCount++;
            } catch (error) {
                console.error(`❌ [UPLOAD PDFs] Erro ao enviar ${file.relativePath}:`, error.message);
                errorCount++;
            }
        }

        console.log('\n📊 [UPLOAD PDFs] Resumo:');
        console.log(`   ✅ Sucesso: ${successCount}`);
        console.log(`   ❌ Erros: ${errorCount}`);
        console.log(`   📄 Total: ${pdfFiles.length}`);

        if (errorCount > 0) {
            process.exit(1);
        }

        console.log('\n✅ [UPLOAD PDFs] Upload concluído com sucesso!');
    } catch (error) {
        console.error('❌ [UPLOAD PDFs] Erro fatal:', error.message);
        console.error(error.stack);
        process.exit(1);
    }
}

uploadPDFs();

