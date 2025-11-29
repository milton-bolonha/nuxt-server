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

const constitution = defineEventHandler(async (event) => {
  validateApiAccess(event, "constitution/constitution");
  try {
    const articles = await prisma.constitutionArticle.findMany({
      orderBy: { number: "asc" }
    });
    return articles.map((article) => ({
      title: article.title,
      description: article.summary,
      hasArticle: true,
      key: `article${article.number}`
    }));
  } catch (error) {
    console.error("Error fetching constitution articles:", error);
    throw createError({
      statusCode: 500,
      message: "Failed to fetch constitution articles"
    });
  }
});

export { constitution as default };
//# sourceMappingURL=constitution.mjs.map
