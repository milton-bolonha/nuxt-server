import { d as defineEventHandler, h as getRouterParam, c as createError } from '../../../../_/nitro.mjs';
import { v as validateApiAccess } from '../../../../_/validateApiAccess.mjs';
import { a as articles } from '../../../../_/constitution.mjs';
import 'node:http';
import 'node:https';
import 'node:events';
import 'node:buffer';
import 'node:fs';
import 'node:path';
import 'node:crypto';
import '../../../../_/apiTokens.mjs';
import 'crypto';

const _key_ = defineEventHandler(async (event) => {
  console.log("\u{1F50D} [DEBUG] Constitution Articles API called (static data)");
  try {
    console.log("\u{1F510} [DEBUG] Validating API access...");
    validateApiAccess(event, "constitution/articles");
    console.log("\u2705 [DEBUG] API access validated");
    const key = getRouterParam(event, "key");
    if (!key) return [];
    if (!Object.hasOwn(articles, key)) return [];
    console.log("\u{1F4CA} [DEBUG] Returning article:", key);
    return articles[key];
  } catch (error) {
    console.error("\u274C [ERROR] Constitution Articles API failed:", error);
    throw createError({
      statusCode: 500,
      statusMessage: "Failed to fetch constitution article",
      cause: error.message
    });
  }
});

export { _key_ as default };
//# sourceMappingURL=_key_.mjs.map
