import prisma from '../../utils/db'

export default defineEventHandler(async (event) => {
    
    validateApiAccess(event, 'laws/municipal')

    try {
        const laws = await prisma.municipalLaw.findMany({
            orderBy: { code: 'asc' }
        })

        const grouped = laws.reduce((acc: any, law) => {
            const existing = acc.find((g: any) => g.label === law.category)
            if (existing) {
                existing.data.push({
                    title: law.code,
                    subtitle: law.title,
                    content: law.description,
                    excerp: law.description?.substring(0, 150) + '...'
                })
            } else {
                acc.push({
                    label: law.category,
                    data: [{
                        title: law.code,
                        subtitle: law.title,
                        content: law.description,
                        excerp: law.description?.substring(0, 150) + '...'
                    }]
                })
            }
            return acc
        }, [])
        
        return grouped
    } catch (error) {
        console.error('Error fetching municipal laws:', error)
        throw createError({
            statusCode: 500,
            message: 'Failed to fetch municipal laws'
        })
    }
})

