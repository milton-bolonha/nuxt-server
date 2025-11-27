import prisma from '../../utils/db'

export default defineEventHandler(async (event) => {
    
    validateApiAccess(event, 'constitution/constitution-amandments')

    try {
        const amendments = await prisma.constitutionAmendment.findMany({
            orderBy: { number: 'asc' }
        })
        
        return amendments.map(amendment => ({
            title: amendment.title,
            content: amendment.content,
            description: amendment.summary,
            hasArticle: false
        }))
    } catch (error) {
        console.error('Error fetching constitution amendments:', error)
        throw createError({
            statusCode: 500,
            message: 'Failed to fetch constitution amendments'
        })
    }
})

