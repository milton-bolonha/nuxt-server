import { d as defineEventHandler, b as apiRateLimiter, a as getQuery, c as createError } from '../../../_/nitro.mjs';
import { g as getCaseById } from '../../../_/cases.mjs';
import 'node:http';
import 'node:https';
import 'node:events';
import 'node:buffer';
import 'node:fs';
import 'node:path';
import 'node:crypto';

const case_get = defineEventHandler(async (event) => {
  await apiRateLimiter.middleware()(event);
  const query = getQuery(event);
  const caseType = query.type;
  const caseId = query.id;
  if (!caseType || !["criminal", "civil"].includes(caseType)) {
    throw createError({
      statusCode: 400,
      statusMessage: 'Invalid case type. Must be "criminal" or "civil"'
    });
  }
  if (!caseId) {
    throw createError({
      statusCode: 400,
      statusMessage: "Case ID is required"
    });
  }
  const caseData = getCaseById(caseType, caseId);
  if (!caseData) {
    throw createError({
      statusCode: 404,
      statusMessage: "Case not found"
    });
  }
  return {
    success: true,
    case: caseData
  };
});

export { case_get as default };
//# sourceMappingURL=case.get.mjs.map
