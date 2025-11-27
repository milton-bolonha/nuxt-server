import prisma from '../../utils/db'

export default defineEventHandler(async (event) => {
    
    validateApiAccess(event, 'resources/vips')

    try {
        const data = await prisma.vIP.findMany({
            orderBy: { userId: 'asc' }
        })
        
        return data
    } catch (error) {
        console.error('Error fetching VIPs:', error)
        throw createError({
            statusCode: 500,
            message: 'Failed to fetch VIPs'
        })
    }
})

