import { d as defineEventHandler, c as createError } from '../../../_/nitro.mjs';
import { v as validateApiAccess } from '../../../_/validateApiAccess.mjs';
import { c as constitutionAmendments } from '../../../_/constitution.mjs';
import 'node:http';
import 'node:https';
import 'node:events';
import 'node:buffer';
import 'node:fs';
import 'node:path';
import 'node:crypto';
import '../../../_/apiTokens.mjs';
import 'crypto';

const constitutionAmandments = defineEventHandler(async (event) => {
  console.log(
    "\u{1F50D} [DEBUG] Constitution Amendments API called (direct TypeScript import)"
  );
  try {
    console.log("\u{1F510} [DEBUG] Validating API access...");
    validateApiAccess(event, "constitution/constitution-amandments");
    console.log("\u2705 [DEBUG] API access validated");
    const result = constitutionAmendments.map((amendment) => ({
      title: amendment.title,
      content: amendment.content,
      description: amendment.summary,
      hasArticle: false
    }));
    console.log(
      "\u{1F4CA} [DEBUG] Returning",
      result.length,
      "constitution amendments"
    );
    return result;
  } catch (error) {
    console.error("\u274C [ERROR] Constitution Amendments API failed:", error);
    throw createError({
      statusCode: 500,
      statusMessage: "Failed to fetch constitution amendments",
      cause: error.message
    });
  }
});

export { constitutionAmandments as default };
//# sourceMappingURL=constitution-amandments.mjs.map
