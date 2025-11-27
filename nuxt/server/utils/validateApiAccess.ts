import { validateApiToken } from './apiTokens'
import type { H3Event } from 'h3'

export function validateApiAccess(event: H3Event, endpoint: string) {
    
    const authHeader = getHeader(event, 'authorization')

    if (!authHeader) {
        throw createError({
            statusCode: 401,
            statusMessage: 'Authorization token required'
        })
    }

    const token = authHeader.startsWith('Bearer ')
        ? authHeader.substring(7)
        : authHeader

    const isValid = validateApiToken(token, endpoint)

    if (!isValid) {
        throw createError({
            statusCode: 403,
            statusMessage: 'Invalid or expired token'
        })
    }
}
