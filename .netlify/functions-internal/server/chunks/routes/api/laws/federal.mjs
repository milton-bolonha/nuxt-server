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

const federal = defineEventHandler(async (event) => {
  validateApiAccess(event, "laws/federal");
  try {
    const laws = await prisma.law.findMany({
      orderBy: { title: "asc" }
    });
    return laws.map((law) => {
      var _a;
      return {
        title: law.title,
        subtitle: law.title,
        content: law.description,
        excerp: ((_a = law.description) == null ? void 0 : _a.substring(0, 200)) + (law.description && law.description.length > 200 ? "..." : "")
      };
    });
  } catch (error) {
    console.error("Error fetching federal laws:", error);
    throw createError({
      statusCode: 500,
      message: "Failed to fetch federal laws"
    });
  }
});

export { federal as default };
//# sourceMappingURL=federal.mjs.map
