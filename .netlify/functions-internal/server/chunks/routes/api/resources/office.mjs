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

const office = defineEventHandler(async (event) => {
  validateApiAccess(event, "resources/office");
  try {
    const offices = await prisma.office.findMany({
      orderBy: { name: "asc" }
    });
    const grouped = offices.reduce((acc, office) => {
      const existing = acc.find((g) => g.label === office.category);
      if (existing) {
        existing.data.push({
          title: office.name,
          description: office.description
        });
      } else {
        acc.push({
          label: office.category,
          data: [{
            title: office.name,
            description: office.description
          }]
        });
      }
      return acc;
    }, []);
    return grouped;
  } catch (error) {
    console.error("Error fetching offices:", error);
    throw createError({
      statusCode: 500,
      message: "Failed to fetch offices"
    });
  }
});

export { office as default };
//# sourceMappingURL=office.mjs.map
