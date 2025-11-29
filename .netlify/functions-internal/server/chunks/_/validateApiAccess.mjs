import { k as getHeader, c as createError } from './nitro.mjs';
import { v as validateApiToken } from './apiTokens.mjs';

function validateApiAccess(event, endpoint) {
  const authHeader = getHeader(event, "authorization");
  if (!authHeader) {
    throw createError({
      statusCode: 401,
      statusMessage: "Authorization token required"
    });
  }
  const token = authHeader.startsWith("Bearer ") ? authHeader.substring(7) : authHeader;
  const isValid = validateApiToken(token, endpoint);
  if (!isValid) {
    throw createError({
      statusCode: 403,
      statusMessage: "Invalid or expired token"
    });
  }
}

export { validateApiAccess as v };
//# sourceMappingURL=validateApiAccess.mjs.map
