import { d as defineEventHandler, c as createError } from '../../../_/nitro.mjs';
import { v as validateApiAccess } from '../../../_/validateApiAccess.mjs';
import { b as constitutionArticles } from '../../../_/constitution.mjs';
import 'node:http';
import 'node:https';
import 'node:events';
import 'node:buffer';
import 'node:fs';
import 'node:path';
import 'node:crypto';
import '../../../_/apiTokens.mjs';
import 'crypto';

const constitution = defineEventHandler(async (event) => {
  console.log(
    "\u{1F50D} [DEBUG] Constitution API called (direct TypeScript import)"
  );
  try {
    console.log("\u{1F510} [DEBUG] Validating API access...");
    validateApiAccess(event, "constitution/constitution");
    console.log("\u2705 [DEBUG] API access validated");
    const result = constitutionArticles.map((article) => ({
      title: article.title,
      description: article.summary,
      hasArticle: true,
      key: `article${article.number}`
    }));
    console.log(
      "\u{1F4CA} [DEBUG] Returning",
      result.length,
      "constitution articles"
    );
    return result;
  } catch (error) {
    console.error("\u274C [ERROR] Constitution API failed:", error);
    throw createError({
      statusCode: 500,
      statusMessage: "Failed to fetch constitution articles",
      cause: error.message
    });
  }
});

export { constitution as default };
//# sourceMappingURL=constitution.mjs.map
