import { promises as fs } from 'node:fs'
import { join, resolve } from 'node:path'
import { existsSync } from 'node:fs'

/**
 * Resolve o caminho do arquivo PDF considerando diferentes ambientes:
 * - Desenvolvimento: server/bills/...
 * - Netlify: os serverAssets são copiados para dentro da function
 * 
 * No Netlify, os serverAssets configurados com baseName "bills" são
 * copiados para dentro da function mantendo a estrutura de diretórios.
 */
function resolvePdfPath(filePath: string): string {
    // Caminhos possíveis baseados no ambiente
    // No Netlify, os serverAssets são copiados para dentro da function
    // e podem ser acessados através de caminhos relativos ou absolutos
    
    const possiblePaths: string[] = []
    
    // Caminho padrão de desenvolvimento (process.cwd() aponta para a raiz do projeto)
    possiblePaths.push(join(process.cwd(), 'server', 'bills', filePath))
    
    // Caminho absoluto (mesmo que acima, mas mais explícito)
    possiblePaths.push(resolve(process.cwd(), 'server', 'bills', filePath))
    
    // No Netlify, os serverAssets podem estar em caminhos relativos à function
    // Tentar caminhos relativos comuns usados pelo Nitro
    if (process.env.NETLIFY || process.env.NITRO_PRESET === 'netlify') {
        // Caminhos alternativos para Netlify
        possiblePaths.push(join('.', 'bills', filePath))
    }
    
    // Tentar encontrar o arquivo em um dos caminhos
    for (const path of possiblePaths) {
        try {
            if (existsSync(path)) {
                return path
            }
        } catch {
            // Continuar tentando outros caminhos
            continue
        }
    }
    
    // Retornar o caminho padrão (será tentado e pode lançar erro se não existir)
    return join(process.cwd(), 'server', 'bills', filePath)
}

export default defineEventHandler(async (event) => {
    const token = getRouterParam(event, 'token')

    if (!token) {
        throw createError({
            statusCode: 400,
            statusMessage: 'Token is required'
        })
    }

    const filePath = validatePdfToken(token)

    if (!filePath) {
        throw createError({
            statusCode: 403,
            statusMessage: 'Invalid or expired token'
        })
    }

    if (filePath.includes('..') || filePath.includes('~')) {
        throw createError({
            statusCode: 403,
            statusMessage: 'Invalid file path'
        })
    }

    try {
        // Resolver o caminho do arquivo PDF
        const fullPath = resolvePdfPath(filePath)
        
        const pdfBuffer = await fs.readFile(fullPath)

        setResponseHeaders(event, {
            'Content-Type': 'application/pdf',
            'Content-Disposition': `inline; filename="${filePath.split('/').pop()}"`,
            'Cache-Control': 'private, no-cache, no-store, must-revalidate',
            'Expires': '0',
            'Pragma': 'no-cache'
        })

        return pdfBuffer
    } catch (error: any) {
        console.error('Error reading PDF file:', {
            filePath,
            error: error?.message,
            stack: error?.stack
        })
        throw createError({
            statusCode: 404,
            statusMessage: 'PDF file not found'
        })
    }
})
