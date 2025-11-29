import { d as defineEventHandler, b as apiRateLimiter, a as getQuery, c as createError } from '../../../_/nitro.mjs';
import { b as getRandomCase } from '../../../_/cases.mjs';
import 'node:http';
import 'node:https';
import 'node:events';
import 'node:buffer';
import 'node:fs';
import 'node:path';
import 'node:crypto';

const randomCase_get = defineEventHandler(async (event) => {
  await apiRateLimiter.middleware()(event);
  const query = getQuery(event);
  const caseType = query.type;
  if (!caseType || !["criminal", "civil"].includes(caseType)) {
    throw createError({
      statusCode: 400,
      statusMessage: 'Invalid case type. Must be "criminal" or "civil"'
    });
  }
  const caseData = getRandomCase(caseType);
  if (!caseData) {
    throw createError({
      statusCode: 404,
      statusMessage: "No cases available for this type"
    });
  }
  return {
    success: true,
    case: caseData
  };
});

export { randomCase_get as default };
//# sourceMappingURL=random-case.get.mjs.map
