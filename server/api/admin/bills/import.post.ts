import prisma from '../../../utils/db'

export default defineEventHandler(async (event) => {
  const body = await readBody(event)
  
  if (!Array.isArray(body.bills)) {
    throw createError({ 
      statusCode: 400, 
      message: 'Invalid data format. Expected { bills: [...] }' 
    })
  }
  
  const results = {
    success: 0,
    failed: 0,
    updated: 0,
    created: 0,
    errors: [] as string[]
  }
  
  for (const billData of body.bills) {
    try {
      
      if (!billData.number || !billData.type || !billData.description) {
        throw new Error(`Missing required fields for bill: ${billData.number || 'unknown'}`)
      }

      const existing = await prisma.bill.findFirst({
        where: { 
          number: billData.number,
          category: billData.category || 'congress'
        }
      })
      
      if (existing) {
        
        await prisma.bill.update({
          where: { id: existing.id },
          data: {
            description: billData.description,
            pdfPath: billData.pdfPath || existing.pdfPath,
            type: billData.type
          }
        })
        results.updated++
      } else {
        
        await prisma.bill.create({
          data: {
            number: billData.number,
            description: billData.description,
            pdfPath: billData.pdfPath || '',
            type: billData.type,
            category: billData.category || 'congress'
          }
        })
        results.created++
      }
      
      results.success++
    } catch (error: any) {
      results.failed++
      results.errors.push(`${billData.number}: ${error.message}`)
    }
  }
  
  return results
})
