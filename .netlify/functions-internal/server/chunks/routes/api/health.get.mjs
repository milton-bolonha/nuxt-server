import { d as defineEventHandler, c as createError } from '../../_/nitro.mjs';
import { p as prisma } from '../../_/db.mjs';
import 'node:http';
import 'node:https';
import 'node:events';
import 'node:buffer';
import 'node:fs';
import 'node:path';
import 'node:crypto';
import '@prisma/client';

const health_get = defineEventHandler(async (event) => {
  const startTime = Date.now();
  const health = {
    status: "healthy",
    timestamp: (/* @__PURE__ */ new Date()).toISOString(),
    uptime: process.uptime(),
    environment: "production",
    checks: {
      database: "unknown",
      cache: "unknown"
    },
    responseTime: 0
  };
  try {
    await prisma.$queryRaw`SELECT 1`;
    health.checks.database = "connected";
  } catch (error) {
    health.status = "unhealthy";
    health.checks.database = "disconnected";
    console.error("Database health check failed:", error);
  }
  try {
    const { redis } = await import('../../_/cache.mjs');
    if (redis) {
      await redis.ping();
      health.checks.cache = "connected";
    } else {
      health.checks.cache = "not_configured";
    }
  } catch (error) {
    health.checks.cache = "disconnected";
  }
  health.responseTime = Date.now() - startTime;
  if (health.status === "unhealthy") {
    throw createError({
      statusCode: 503,
      statusMessage: "Service Unavailable",
      data: health
    });
  }
  return health;
});

export { health_get as default };
//# sourceMappingURL=health.get.mjs.map
