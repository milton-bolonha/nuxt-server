import { d as defineEventHandler, c as createError } from '../../../_/nitro.mjs';
import { v as validateApiAccess } from '../../../_/validateApiAccess.mjs';
import { p as prisma } from '../../../_/db.mjs';
import 'node:http';
import 'node:https';
import 'node:events';
import 'node:buffer';
import 'node:fs';
import 'node:path';
import 'node:crypto';
import '../../../_/apiTokens.mjs';
import 'crypto';
import '@prisma/client';

const vips = defineEventHandler(async (event) => {
  validateApiAccess(event, "resources/vips");
  try {
    const data = await prisma.vIP.findMany({
      orderBy: { userId: "asc" }
    });
    return data;
  } catch (error) {
    console.error("Error fetching VIPs:", error);
    throw createError({
      statusCode: 500,
      message: "Failed to fetch VIPs"
    });
  }
});

export { vips as default };
//# sourceMappingURL=vips.mjs.map
