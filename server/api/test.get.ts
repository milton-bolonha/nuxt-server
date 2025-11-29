import prisma from '../utils/db'

export default defineEventHandler(async () => {
    try {
        // Test basic connection
        await prisma.$connect()

        // Test if tables exist
        const count = await prisma.constitutionArticle.count()

        return {
            status: 'OK',
            constitutionArticlesCount: count,
            timestamp: new Date().toISOString()
        }
    } catch (error) {
        console.error('Database test failed:', error)
        throw createError({
            statusCode: 500,
            message: 'Database connection failed',
            cause: error.message
        })
    }
})