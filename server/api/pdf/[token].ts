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
 * Tenta ler o PDF do sistema de arquivos (fallback para desenvolvimento)
 */
async function readPdfFromFileSystem(filePath: string): Promise<Buffer | null> {
    const possiblePaths: string[] = []
    
    // Caminho padrão de desenvolvimento
    possiblePaths.push(join(process.cwd(), 'server', 'bills', filePath))
    
    // Caminho absoluto
    possiblePaths.push(resolve(process.cwd(), 'server', 'bills', filePath))
    
    console.log('🔍 [PDF DEBUG] Tentando ler do sistema de arquivos')
    console.log('🔍 [PDF DEBUG] process.cwd():', process.cwd())
    console.log('🔍 [PDF DEBUG] NODE_ENV:', process.env.NODE_ENV)
    console.log('🔍 [PDF DEBUG] NETLIFY:', process.env.NETLIFY)
    console.log('🔍 [PDF DEBUG] NITRO_PRESET:', process.env.NITRO_PRESET)
    
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
