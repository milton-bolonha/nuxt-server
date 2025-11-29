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

const eo = defineEventHandler(async (event) => {
  validateApiAccess(event, "laws/eo");
  try {
    const eos = await prisma.executiveOrder.findMany({
      orderBy: { number: "asc" }
    });
    return eos.map((eo) => ({
      title: eo.number,
      subtitle: eo.title,
      content: eo.description,
      excerp: eo.description
    }));
  } catch (error) {
    console.error("Error fetching executive orders:", error);
    throw createError({
      statusCode: 500,
      message: "Failed to fetch executive orders"
    });
  }
});

export { eo as default };
//# sourceMappingURL=eo.mjs.map
