import { d as defineEventHandler, b as apiRateLimiter, r as readBody, c as createError } from '../../../_/nitro.mjs';
import { g as getCaseById, b as getRandomCase } from '../../../_/cases.mjs';
import 'node:http';
import 'node:https';
import 'node:events';
import 'node:buffer';
import 'node:fs';
import 'node:path';
import 'node:crypto';

const start_post = defineEventHandler(async (event) => {
  await apiRateLimiter.middleware()(event);
  const body = await readBody(event);
  const { caseType, caseId, role, playerName } = body;
  if (!caseType || !["criminal", "civil"].includes(caseType)) {
    throw createError({
      statusCode: 400,
      statusMessage: 'Invalid case type. Must be "criminal" or "civil"'
    });
  }
  const validRoles = ["judge", "prosecutor", "plaintiff", "defense", "witness", "jury"];
  if (!role || !validRoles.includes(role)) {
    throw createError({
      statusCode: 400,
      statusMessage: "Invalid role"
    });
  }
  let caseData;
  if (caseId) {
    caseData = getCaseById(caseType, caseId);
  } else {
    caseData = getRandomCase(caseType);
  }
  if (!caseData) {
    throw createError({
      statusCode: 404,
      statusMessage: "Case not found"
    });
  }
  return {
    success: true,
    trial: {
      caseData,
      playerRole: role,
      playerName: playerName || "Player",
      caseType,
      startedAt: (/* @__PURE__ */ new Date()).toISOString()
    }
  };
});

export { start_post as default };
//# sourceMappingURL=start.post.mjs.map
