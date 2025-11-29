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

const frcp = defineEventHandler(async (event) => {
  validateApiAccess(event, "federal-rules/frcp");
  try {
    const rules = await prisma.federalRule.findMany({
      where: { type: "frcp" },
      orderBy: { number: "asc" }
    });
    return [{
      label: "Federal Rules of Civil Procedure",
      data: rules.map((rule) => ({
        title: rule.number,
        subtitle: rule.title,
        content: rule.description,
        excerp: rule.description.substring(0, 200) + "..."
      }))
    }];
  } catch (error) {
    console.error("Error fetching FRCP rules:", error);
    throw createError({
      statusCode: 500,
      message: "Failed to fetch FRCP rules"
    });
  }
});

export { frcp as default };
//# sourceMappingURL=frcp.mjs.map
