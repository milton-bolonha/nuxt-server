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

const constitutionAmandments = defineEventHandler(async (event) => {
  validateApiAccess(event, "constitution/constitution-amandments");
  try {
    const amendments = await prisma.constitutionAmendment.findMany({
      orderBy: { number: "asc" }
    });
    return amendments.map((amendment) => ({
      title: amendment.title,
      content: amendment.content,
      description: amendment.summary,
      hasArticle: false
    }));
  } catch (error) {
    console.error("Error fetching constitution amendments:", error);
    throw createError({
      statusCode: 500,
      message: "Failed to fetch constitution amendments"
    });
  }
});

export { constitutionAmandments as default };
//# sourceMappingURL=constitution-amandments.mjs.map
