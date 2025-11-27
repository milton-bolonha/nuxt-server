import prisma from '../../utils/db'

export default defineEventHandler(async (event) => {
    
    validateApiAccess(event, 'resources/court-procedure')

    try {
        const procedures = await prisma.courtProcedure.findMany({
            orderBy: { id: 'asc' }
        })

        return procedures.map(p => p.description)
    } catch (error) {
        console.error('Error fetching court procedures:', error)
        throw createError({
            statusCode: 500,
            message: 'Failed to fetch court procedures'
        })
    }
})

