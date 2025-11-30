import { promises as fs } from 'node:fs'
import { join, resolve } from 'node:path'
import { existsSync } from 'node:fs'

/**
 * Tenta ler o PDF usando o storage layer do Nitro (método recomendado)
 * Os serverAssets com baseName "bills" são acessíveis via useStorage('assets:bills')
 */
async function readPdfFromStorage(filePath: string): Promise<Buffer | null> {
    try {
        console.log('🔍 [PDF DEBUG] Tentando ler via useStorage, filePath:', filePath)
        
        // No Nitro, serverAssets são acessados via storage layer
        // baseName "bills" -> useStorage('assets:bills')
        // O diretório server/bills/ é copiado inteiro, então:
        // - server/bills/bills/hr1.pdf -> acessível como "bills/hr1.pdf"
        // - server/bills/dcbills/... -> acessível como "dcbills/..."
        const storage = useStorage('assets:bills')
        
        if (!storage) {
            console.error('❌ [PDF DEBUG] Storage "assets:bills" não está disponível!')
            return null
        }
        
        console.log('✅ [PDF DEBUG] Storage "assets:bills" está disponível')
        console.log('🔍 [PDF DEBUG] Storage path (filePath direto):', filePath)
        console.log('🔍 [PDF DEBUG] Storage mount:', 'assets:bills')
        
        // Tentar obter informações sobre o storage
        try {
            const storageKeys = await storage.getKeys('')
            console.log('📋 [PDF DEBUG] Storage getKeys() retornou:', storageKeys.length, 'chaves')
            if (storageKeys.length > 0) {
                console.log('📋 [PDF DEBUG] Primeiras 10 chaves do storage:', storageKeys.slice(0, 10))
            }
        } catch (keysError: any) {
            console.log('⚠️ [PDF DEBUG] Erro ao obter chaves do storage:', keysError?.message)
        }
        
        // Tentar verificar se o storage tem um método para obter o caminho base
        try {
            if (storage && typeof (storage as any).mount === 'function') {
                console.log('🔍 [PDF DEBUG] Storage tem método mount')
            }
            if (storage && typeof (storage as any).base === 'string') {
                console.log('🔍 [PDF DEBUG] Storage base path:', (storage as any).base)
            }
        } catch (infoError: any) {
            console.log('⚠️ [PDF DEBUG] Não foi possível obter info adicional do storage')
        }
        
        // Tentar ler o arquivo do storage usando o filePath completo
        let pdfBuffer = await storage.getItemRaw(filePath)
        
        // Se não encontrou, tentar sem o prefixo (caso o Nitro tenha copiado de forma diferente)
        if (!pdfBuffer) {
            console.log('🔄 [PDF DEBUG] Tentando sem prefixo...')
            const pathWithoutPrefix = filePath.replace(/^(bills|dcbills)\//, '')
            pdfBuffer = await storage.getItemRaw(pathWithoutPrefix)
            console.log('🔄 [PDF DEBUG] Tentou path sem prefixo:', pathWithoutPrefix)
        }
        
        if (pdfBuffer) {
            console.log('✅ [PDF DEBUG] Arquivo encontrado via useStorage, tamanho:', pdfBuffer.length)
            return Buffer.from(pdfBuffer)
        }
        
        // Debug: tentar listar algumas chaves disponíveis no storage (limitado para não sobrecarregar)
        try {
            console.log('📋 [PDF DEBUG] Tentando listar chaves disponíveis no storage...')
            const keys = await storage.getKeys('', { maxDepth: 2 })
            console.log('📋 [PDF DEBUG] Total de chaves encontradas:', keys.length)
            if (keys.length > 0) {
                console.log('📋 [PDF DEBUG] Primeiras 10 chaves:', keys.slice(0, 10))
            }
        } catch (listError: any) {
            console.log('⚠️ [PDF DEBUG] Não foi possível listar chaves:', listError?.message)
        }
        
        console.log('⚠️ [PDF DEBUG] Arquivo não encontrado via useStorage')
        return null
    } catch (error: any) {
        console.error('❌ [PDF DEBUG] Erro ao ler via useStorage:', error?.message)
        console.error('❌ [PDF DEBUG] Stack:', error?.stack)
        return null
    }
}

/**
 * Lista todos os PDFs encontrados recursivamente
 */
async function findAllPDFs(dir: string, depth: number = 0, maxDepth: number = 4, foundPDFs: string[] = []): Promise<string[]> {
    if (depth > maxDepth) return foundPDFs
    
    try {
        const entries = await fs.readdir(dir, { withFileTypes: true })
        
        for (const entry of entries) {
            const fullPath = join(dir, entry.name)
            if (entry.isDirectory()) {
                // Explorar recursivamente
                await findAllPDFs(fullPath, depth + 1, maxDepth, foundPDFs)
            } else if (entry.name.endsWith('.pdf')) {
                foundPDFs.push(fullPath)
            }
        }
    } catch (error: any) {
        // Ignorar erros de permissão ou diretórios inacessíveis
    }
    
    return foundPDFs
}

/**
 * Explora a estrutura de diretórios para encontrar onde os arquivos estão
 */
async function exploreDirectory(dir: string, depth: number = 2, maxDepth: number = 3): Promise<void> {
    if (depth > maxDepth) return
    
    try {
        const entries = await fs.readdir(dir, { withFileTypes: true })
        console.log(`📁 [PDF DEBUG] Conteúdo de ${dir} (${entries.length} itens):`)
        
        for (const entry of entries.slice(0, 50)) { // Aumentar limite para ver mais
            const fullPath = join(dir, entry.name)
            if (entry.isDirectory()) {
                console.log(`  📂 ${entry.name}/`)
                // Explorar chunks com mais profundidade, especialmente raw
                // Explorar diretórios interessantes mais profundamente
                if (depth < maxDepth) {
                    const shouldExplore = 
                        entry.name.includes('bill') || 
                        entry.name.includes('asset') || 
                        entry.name.includes('chunk') ||
                        entry.name === 'raw' ||
                        entry.name === '_' ||
                        entry.name === 'server' ||
                        entry.name === 'bills' ||
                        entry.name === 'prisma' ||
                        entry.name === 'output';
                    
                    if (shouldExplore) {
                        await exploreDirectory(fullPath, depth + 1, maxDepth)
                    }
                }
            
            // Explorar diretórios raw e asset mais profundamente independente da condição acima
            } else if (entry.name === 'raw' || entry.name.includes('asset') || entry.name === 'output') {
                if (depth < maxDepth + 1) {
                    await exploreDirectory(fullPath, depth + 1, maxDepth + 1)
                }
            } else if (entry.name.endsWith('.pdf')) {
                console.log(`  📄 ${entry.name} (PDF encontrado em ${dir}!)`)
            }
        }
    } catch (error: any) {
        console.log(`  ⚠️ [PDF DEBUG] Erro ao ler diretório ${dir}:`, error?.message)
    }
}

/**
 * Tenta ler o PDF do sistema de arquivos (fallback para desenvolvimento)
 */
async function readPdfFromFileSystem(filePath: string): Promise<Buffer | null> {
    const possiblePaths: string[] = []
    const cwd = process.cwd()
    
    console.log('🔍 [PDF DEBUG] Tentando ler do sistema de arquivos')
    console.log('🔍 [PDF DEBUG] process.cwd():', cwd)
    console.log('🔍 [PDF DEBUG] __dirname:', typeof __dirname !== 'undefined' ? __dirname : 'undefined (ES modules)')
    console.log('🔍 [PDF DEBUG] NODE_ENV:', process.env.NODE_ENV)
    console.log('🔍 [PDF DEBUG] NETLIFY:', process.env.NETLIFY)
    console.log('🔍 [PDF DEBUG] NITRO_PRESET:', process.env.NITRO_PRESET)
    console.log('🔍 [PDF DEBUG] filePath procurado:', filePath)
    
    // Explorar estrutura de diretórios primeiro
    console.log('🔍 [PDF DEBUG] Explorando estrutura de diretórios...')
    try {
        await exploreDirectory(cwd, 1, 3)
        
        // Tentar encontrar TODOS os PDFs em /var/task
        console.log('🔍 [PDF DEBUG] Procurando TODOS os PDFs em /var/task...')
        const allPDFs = await findAllPDFs(cwd, 0, 5)
        if (allPDFs.length > 0) {
            console.log(`✅ [PDF DEBUG] Encontrados ${allPDFs.length} arquivos PDF!`)
            console.log('📄 [PDF DEBUG] PDFs encontrados:')
            allPDFs.slice(0, 10).forEach((pdf, idx) => {
                console.log(`  ${idx + 1}. ${pdf}`)
            })
        } else {
            console.log('❌ [PDF DEBUG] NENHUM PDF encontrado em /var/task')
        }
    } catch (error: any) {
        console.log('⚠️ [PDF DEBUG] Erro ao explorar diretórios:', error?.message)
    }
    
    // Caminhos possíveis baseados no ambiente
    possiblePaths.push(
        // Caminho padrão de desenvolvimento
        join(cwd, 'server', 'bills', filePath),
        // Caminho absoluto
        resolve(cwd, 'server', 'bills', filePath),
        // Netlify: tentar em diferentes locais onde o Nitro pode colocar assets
        join(cwd, 'bills', filePath),
        join(cwd, '.nitro', 'bills', filePath),
        join(cwd, 'chunks', 'raw', 'bills', filePath),
        join(cwd, 'chunks', 'raw', 'server', 'bills', filePath),
        // Tentar caminhos relativos à função
        join(cwd, 'server', 'assets', 'bills', filePath),
        join(cwd, 'assets', 'bills', filePath),
        // Caminho onde o script copy-pdfs.js copia os arquivos
        join(cwd, '.output', 'server', 'bills', filePath),
        // Tentar diretamente no diretório de trabalho
        join(cwd, filePath)
    )
    
    // Se estiver no Netlify, tentar caminhos específicos do Lambda
    if (cwd === '/var/task') {
        console.log('🌐 [PDF DEBUG] Detectado ambiente Netlify Lambda (/var/task)')
        // Os PDFs foram copiados para .netlify/functions-internal/server/bills/ durante o build
        // No runtime do Lambda, eles devem estar em /var/task/bills/
        possiblePaths.push(
            join('/var/task', 'bills', filePath), // Caminho mais provável - onde foram copiados
            join('/var/task', 'bills', filePath.replace(/^bills\//, '')), // Tentar sem prefixo bills/
            join('/var/task', '.nitro', 'bills', filePath),
            join('/var/task', 'chunks', 'raw', 'bills', filePath),
            join('/var/task', 'server', 'assets', 'bills', filePath),
            join('/var/task', 'assets', 'bills', filePath),
            // Caminhos alternativos
            join('/var/task', '.output', 'server', 'bills', filePath),
            join('/var/task', 'output', 'server', 'bills', filePath)
        )
    }
    
    for (const path of possiblePaths) {
        try {
            console.log('🔍 [PDF DEBUG] Tentando caminho:', path)
            if (existsSync(path)) {
                console.log('✅ [PDF DEBUG] Arquivo encontrado no sistema de arquivos:', path)
                const buffer = await fs.readFile(path)
                console.log('✅ [PDF DEBUG] Arquivo lido com sucesso, tamanho:', buffer.length)
                return buffer
            } else {
                console.log('❌ [PDF DEBUG] Arquivo não existe em:', path)
            }
        } catch (error: any) {
            console.error('❌ [PDF DEBUG] Erro ao verificar caminho:', path, error?.message)
            continue
        }
    }
    
    return null
}

export default defineEventHandler(async (event) => {
    console.log('📥 [PDF DEBUG] ========================================')
    console.log('📥 [PDF DEBUG] Iniciando requisição de PDF')
    console.log('📥 [PDF DEBUG] URL:', event.node.req.url)
    console.log('📥 [PDF DEBUG] ========================================')
    
    const token = getRouterParam(event, 'token')
    console.log('🔑 [PDF DEBUG] Token recebido:', token ? `${token.substring(0, 50)}...` : 'NONE')

    if (!token) {
        console.error('❌ [PDF DEBUG] Token não fornecido')
        throw createError({
            statusCode: 400,
            statusMessage: 'Token is required'
        })
    }

    const filePath = validatePdfToken(token)
    console.log('🔓 [PDF DEBUG] FilePath decodificado do token:', filePath)

    if (!filePath) {
        console.error('❌ [PDF DEBUG] Token inválido ou expirado')
        throw createError({
            statusCode: 403,
            statusMessage: 'Invalid or expired token'
        })
    }

    if (filePath.includes('..') || filePath.includes('~')) {
        console.error('❌ [PDF DEBUG] Caminho inválido (contém .. ou ~):', filePath)
        throw createError({
            statusCode: 403,
            statusMessage: 'Invalid file path'
        })
    }

    try {
        console.log('📂 [PDF DEBUG] Tentando ler PDF:', filePath)
        
        // Método 1: Tentar usar o storage layer do Nitro (método recomendado)
        let pdfBuffer: Buffer | null = await readPdfFromStorage(filePath)
        
        // Método 2: Fallback para sistema de arquivos (desenvolvimento)
        if (!pdfBuffer) {
            console.log('🔄 [PDF DEBUG] Fallback para sistema de arquivos')
            pdfBuffer = await readPdfFromFileSystem(filePath)
        }
        
        if (!pdfBuffer) {
            console.error('❌ [PDF DEBUG] PDF não encontrado em nenhum método')
            console.error('❌ [PDF DEBUG] FilePath procurado:', filePath)
            throw createError({
                statusCode: 404,
                statusMessage: 'PDF file not found'
            })
        }

        const filename = filePath.split('/').pop() || 'document.pdf'
        console.log('✅ [PDF DEBUG] PDF encontrado, enviando resposta')
        console.log('✅ [PDF DEBUG] Tamanho do buffer:', pdfBuffer.length, 'bytes')
        console.log('✅ [PDF DEBUG] Filename:', filename)

        setResponseHeaders(event, {
            'Content-Type': 'application/pdf',
            'Content-Disposition': `inline; filename="${filename}"`,
            'Cache-Control': 'private, no-cache, no-store, must-revalidate',
            'Expires': '0',
            'Pragma': 'no-cache'
        })

        return pdfBuffer
    } catch (error: any) {
        console.error('❌ [PDF DEBUG] ========================================')
        console.error('❌ [PDF DEBUG] ERRO FINAL ao processar PDF')
        console.error('❌ [PDF DEBUG] FilePath:', filePath)
        console.error('❌ [PDF DEBUG] Error message:', error?.message)
        console.error('❌ [PDF DEBUG] Error stack:', error?.stack)
        console.error('❌ [PDF DEBUG] ========================================')
        
        // Se já é um createError, re-throw
        if (error?.statusCode) {
            throw error
        }
        
        throw createError({
            statusCode: 404,
            statusMessage: 'PDF file not found',
            data: {
                filePath,
                error: error?.message
            }
        })
    }
})
