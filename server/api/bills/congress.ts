import prisma from '../../utils/db'

export default defineEventHandler(async (event) => {
    
    validateApiAccess(event, 'bills/congress')

    try {
        const bills = await prisma.bill.findMany({
            where: { category: 'congress' },
            orderBy: { number: 'asc' }
        })
        
        return bills
    } catch (error) {
        console.error('Error fetching congress bills:', error)
        throw createError({
            statusCode: 500,
            message: 'Failed to fetch congress bills'
        })
    }
})

