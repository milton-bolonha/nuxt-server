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

const municipal = defineEventHandler(async (event) => {
  validateApiAccess(event, "laws/municipal");
  try {
    const laws = await prisma.municipalLaw.findMany({
      orderBy: { code: "asc" }
    });
    const grouped = laws.reduce((acc, law) => {
      var _a, _b;
      const existing = acc.find((g) => g.label === law.category);
      if (existing) {
        existing.data.push({
          title: law.code,
          subtitle: law.title,
          content: law.description,
          excerp: ((_a = law.description) == null ? void 0 : _a.substring(0, 150)) + "..."
        });
      } else {
        acc.push({
          label: law.category,
          data: [{
            title: law.code,
            subtitle: law.title,
            content: law.description,
            excerp: ((_b = law.description) == null ? void 0 : _b.substring(0, 150)) + "..."
          }]
        });
      }
      return acc;
    }, []);
    return grouped;
  } catch (error) {
    console.error("Error fetching municipal laws:", error);
    throw createError({
      statusCode: 500,
      message: "Failed to fetch municipal laws"
    });
  }
});

export { municipal as default };
//# sourceMappingURL=municipal.mjs.map
