import prisma from '../../utils/db'
import { ensureDatabaseInitialized } from '../../utils/initDb'

export default defineEventHandler(async (event) => {

    validateApiAccess(event, 'resources/definitions')

    try {
        // Ensure database is initialized (for Netlify)
        await ensureDatabaseInitialized()

        const data = await prisma.definition.findMany({
            orderBy: { title: 'asc' }
        })

        return data
    } catch (error) {
        console.error('Error fetching definitions:', error)
        throw createError({
            statusCode: 500,
            message: 'Failed to fetch definitions'
        })
    }
})

