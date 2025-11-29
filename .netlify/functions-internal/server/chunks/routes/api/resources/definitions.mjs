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

const definitions = defineEventHandler(async (event) => {
  validateApiAccess(event, "resources/definitions");
  try {
    const data = await prisma.definition.findMany({
      orderBy: { title: "asc" }
    });
    return data;
  } catch (error) {
    console.error("Error fetching definitions:", error);
    throw createError({
      statusCode: 500,
      message: "Failed to fetch definitions"
    });
  }
});

export { definitions as default };
//# sourceMappingURL=definitions.mjs.map
