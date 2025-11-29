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

const test_get = defineEventHandler(async () => {
  try {
    await prisma.$connect();
    const count = await prisma.constitutionArticle.count();
    return {
      status: "OK",
      constitutionArticlesCount: count,
      timestamp: (/* @__PURE__ */ new Date()).toISOString()
    };
  } catch (error) {
    console.error("Database test failed:", error);
    throw createError({
      statusCode: 500,
      message: "Database connection failed",
      cause: error.message
    });
  }
});

export { test_get as default };
//# sourceMappingURL=test.get.mjs.map
