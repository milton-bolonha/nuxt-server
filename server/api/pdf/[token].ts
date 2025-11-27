import { promises as fs } from 'node:fs'
import { join } from 'node:path'

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
        
        const fullPath = join(process.cwd(), 'server', 'bills', filePath)

        const pdfBuffer = await fs.readFile(fullPath)

        setResponseHeaders(event, {
            'Content-Type': 'application/pdf',
            'Content-Disposition': `inline; filename="${filePath.split('/').pop()}"`,
            'Cache-Control': 'private, no-cache, no-store, must-revalidate',
            'Expires': '0',
            'Pragma': 'no-cache'
        })

        return pdfBuffer
    } catch (error) {
        throw createError({
            statusCode: 404,
            statusMessage: 'PDF file not found'
        })
    }
})
