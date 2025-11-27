import prisma from '../../utils/db'

export default defineEventHandler(async (event) => {
    
    validateApiAccess(event, 'resources/files')

    try {
        const data = await prisma.file.findMany({
            orderBy: { title: 'asc' }
        })
        
        return data.map(file => ({
            title: file.title,
            link: file.fileUrl
        }))
    } catch (error) {
        console.error('Error fetching files:', error)
        throw createError({
            statusCode: 500,
            message: 'Failed to fetch files'
        })
    }
})

