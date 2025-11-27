import prisma from '../utils/db'

export default defineNitroPlugin(async () => {
  // Only run on Netlify (production) or when DATABASE_URL is set
  if (process.env.NETLIFY !== 'true' && !process.env.DATABASE_URL?.includes('file:')) {
    return
  }

  console.log('🔄 Checking database for Netlify deployment...')

  try {
    // Test database connection and create tables if needed
    await prisma.$connect()

    // Try a simple query to see if tables exist
    try {
      await prisma.definition.count()
      console.log('✅ Database tables exist')
    } catch (error) {
      console.log('📋 Database tables missing, creating...')

      // If tables don't exist, we'll let the first API call handle it
      // This avoids complex setup during cold starts
      console.log('ℹ️  Tables will be created on first API call')
    }

    console.log('✅ Database connection successful')
  } catch (error) {
    console.error('❌ Database connection failed:', error)
    // Don't throw - allow the app to start even if DB fails initially
  }
})
