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

const courtProcedure = defineEventHandler(async (event) => {
  validateApiAccess(event, "resources/court-procedure");
  try {
    const procedures = await prisma.courtProcedure.findMany({
      orderBy: { id: "asc" }
    });
    return procedures.map((p) => p.description);
  } catch (error) {
    console.error("Error fetching court procedures:", error);
    throw createError({
      statusCode: 500,
      message: "Failed to fetch court procedures"
    });
  }
});

export { courtProcedure as default };
//# sourceMappingURL=court-procedure.mjs.map
