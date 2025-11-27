import prisma from '../../utils/db'

export default defineEventHandler(async (event) => {
    
    validateApiAccess(event, 'constitution/constitution')

    try {
        const articles = await prisma.constitutionArticle.findMany({
            orderBy: { number: 'asc' }
        })
        
        return articles.map(article => ({
            title: article.title,
            description: article.summary,
            hasArticle: true,
            key: `article${article.number}`
        }))
    } catch (error) {
        console.error('Error fetching constitution articles:', error)
        throw createError({
            statusCode: 500,
            message: 'Failed to fetch constitution articles'
        })
    }
})

