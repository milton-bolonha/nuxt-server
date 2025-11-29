import { d as defineEventHandler, b as apiRateLimiter, a as getQuery, c as createError } from '../../../_/nitro.mjs';
import { a as getAllCases } from '../../../_/cases.mjs';
import 'node:http';
import 'node:https';
import 'node:events';
import 'node:buffer';
import 'node:fs';
import 'node:path';
import 'node:crypto';

const cases_get = defineEventHandler(async (event) => {
  await apiRateLimiter.middleware()(event);
  const query = getQuery(event);
  const caseType = query.type;
  if (!caseType || !["criminal", "civil"].includes(caseType)) {
    throw createError({
      statusCode: 400,
      statusMessage: 'Invalid case type. Must be "criminal" or "civil"'
    });
  }
  const cases = getAllCases(caseType);
  return {
    success: true,
    caseType,
    cases
  };
});

export { cases_get as default };
//# sourceMappingURL=cases.get.mjs.map
