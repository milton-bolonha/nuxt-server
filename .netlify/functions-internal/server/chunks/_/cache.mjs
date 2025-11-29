import { Redis } from '@upstash/redis';

let redisClient = null;
if (process.env.UPSTASH_REDIS_REST_URL && process.env.UPSTASH_REDIS_REST_TOKEN) {
  try {
    redisClient = new Redis({
      url: process.env.UPSTASH_REDIS_REST_URL,
      token: process.env.UPSTASH_REDIS_REST_TOKEN
    });
    console.log("\u2705 Redis cache initialized");
  } catch (error) {
    console.warn("\u26A0\uFE0F  Redis initialization failed:", error);
  }
} else {
  console.log("\u2139\uFE0F  Redis not configured - caching disabled");
}
const redis = redisClient;

export { redis };
//# sourceMappingURL=cache.mjs.map
