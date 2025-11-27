import { execSync } from 'child_process'
import prisma from './db'

let isInitialized = false

export async function ensureDatabaseInitialized() {
  if (isInitialized) return

  try {
    // Test if database tables exist
    await prisma.definition.count()
    isInitialized = true
    return
  } catch (error) {
    // Tables don't exist, initialize database
    console.log('🔄 Initializing database for first use...')

    try {
      // Create tables
      execSync('npx prisma db push --skip-generate', { stdio: 'pipe' })

      // Seed database
      execSync('npx prisma db seed', { stdio: 'pipe' })

      isInitialized = true
      console.log('✅ Database initialized successfully')
    } catch (initError) {
      console.error('❌ Failed to initialize database:', initError)
      throw initError
    }
  }
}
