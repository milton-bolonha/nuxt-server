import { d as defineEventHandler, r as readBody, c as createError } from '../../../_/nitro.mjs';
import { v as validateOrigin, s as setCorsHeaders } from '../../../_/validateOrigin.mjs';
import { g as generatePdfToken } from '../../../_/pdfTokens.mjs';
import 'node:http';
import 'node:https';
import 'node:events';
import 'node:buffer';
import 'node:fs';
import 'node:path';
import 'node:crypto';
import 'crypto';

const token_post = defineEventHandler(async (event) => {
  validateOrigin(event);
  setCorsHeaders(event);
  const body = await readBody(event);
  const { pdfPath } = body;
  if (!pdfPath) {
    throw createError({
      statusCode: 400,
      statusMessage: "PDF path is required"
    });
  }
  if (pdfPath.includes("..") || pdfPath.includes("~")) {
    throw createError({
      statusCode: 400,
      statusMessage: "Invalid PDF path"
    });
  }
  if (!pdfPath.startsWith("bills/") && !pdfPath.startsWith("dcbills/")) {
    throw createError({
      statusCode: 400,
      statusMessage: "Invalid PDF path"
    });
  }
  const token = generatePdfToken(pdfPath);
  return {
    token,
    url: `/api/pdf/${token}`
  };
});

export { token_post as default };
//# sourceMappingURL=token.post.mjs.map
