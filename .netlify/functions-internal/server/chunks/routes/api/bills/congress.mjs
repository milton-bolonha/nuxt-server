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

const congress = defineEventHandler(async (event) => {
  validateApiAccess(event, "bills/congress");
  try {
    const bills = await prisma.bill.findMany({
      where: { category: "congress" },
      orderBy: { number: "asc" }
    });
    return bills;
  } catch (error) {
    console.error("Error fetching congress bills:", error);
    throw createError({
      statusCode: 500,
      message: "Failed to fetch congress bills"
    });
  }
});

export { congress as default };
//# sourceMappingURL=congress.mjs.map
