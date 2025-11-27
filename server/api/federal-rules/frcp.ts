import prisma from '../../utils/db'

export default defineEventHandler(async (event) => {
    
    validateApiAccess(event, 'federal-rules/frcp')

    try {
        const rules = await prisma.federalRule.findMany({
            where: { type: 'frcp' },
            orderBy: { number: 'asc' }
        })

        return [{
            label: "Federal Rules of Civil Procedure",
            data: rules.map(rule => ({
                title: rule.number,
                subtitle: rule.title,
                content: rule.description,
                excerp: rule.description.substring(0, 200) + '...'
            }))
        }]
    } catch (error) {
        console.error('Error fetching FRCP rules:', error)
        throw createError({
            statusCode: 500,
            message: 'Failed to fetch FRCP rules'
        })
    }
})

