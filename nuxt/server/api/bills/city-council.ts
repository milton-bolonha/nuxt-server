import prisma from '../../utils/db'

export default defineEventHandler(async (event) => {
    
    validateApiAccess(event, 'bills/city-council')

    try {
        const bills = await prisma.bill.findMany({
            where: { category: 'city-council' },
            orderBy: { number: 'asc' }
        })
        
        return bills
    } catch (error) {
        console.error('Error fetching city council bills:', error)
        throw createError({
            statusCode: 500,
            message: 'Failed to fetch city council bills'
        })
    }
})

