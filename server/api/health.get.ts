import prisma from '../utils/db'

export default defineEventHandler(async (event) => {
  const startTime = Date.now()
  
  const health = {
    status: 'healthy',
    timestamp: new Date().toISOString(),
    uptime: process.uptime(),
    environment: process.env.NODE_ENV || 'development',
    checks: {
      database: 'unknown',
      cache: 'unknown'
    },
    responseTime: 0
  }

  try {
    await prisma.$queryRaw`SELECT 1`
    health.checks.database = 'connected'
  } catch (error) {
    health.status = 'unhealthy'
    health.checks.database = 'disconnected'
    console.error('Database health check failed:', error)
  }

  try {
    const { redis } = await import('../utils/cache')
    if (redis) {
      await redis.ping()
      health.checks.cache = 'connected'
    } else {
      health.checks.cache = 'not_configured'
    }
  } catch (error) {
    health.checks.cache = 'disconnected'
  }

  health.responseTime = Date.now() - startTime

  if (health.status === 'unhealthy') {
    throw createError({
      statusCode: 503,
      statusMessage: 'Service Unavailable',
      data: health
    })
  }

  return health
})
