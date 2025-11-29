import prisma from '../../utils/db'

export default defineEventHandler(async (event) => {
    console.log('🔍 [DEBUG] Constitution API called')

    try {
        console.log('🔐 [DEBUG] Validating API access...')
        validateApiAccess(event, 'constitution/constitution')
        console.log('✅ [DEBUG] API access validated')

        console.log('🗄️ [DEBUG] Connecting to database...')
        const articles = await prisma.constitutionArticle.findMany({
            orderBy: { number: 'asc' }
        })
        console.log('📊 [DEBUG] Found', articles.length, 'constitution articles')

        const result = articles.map(article => ({
            title: article.title,
            description: article.summary,
            hasArticle: true,
            key: `article${article.number}`
        }))

        console.log('✨ [DEBUG] Returning', result.length, 'articles')
        return result

    } catch (error) {
        console.error('❌ [ERROR] Constitution API failed:', error)
        console.error('❌ [ERROR] Error stack:', error.stack)
        throw createError({
            statusCode: 500,
            message: 'Failed to fetch constitution articles',
            cause: error.message
        })
    }
})

