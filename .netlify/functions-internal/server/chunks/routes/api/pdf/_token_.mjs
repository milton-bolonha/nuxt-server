import { d as defineEventHandler, h as getRouterParam, c as createError, i as setResponseHeaders } from '../../../_/nitro.mjs';
import { v as validatePdfToken } from '../../../_/pdfTokens.mjs';
import { promises, existsSync } from 'node:fs';
import { join, resolve } from 'node:path';
import 'node:http';
import 'node:https';
import 'node:events';
import 'node:buffer';
import 'node:crypto';
import 'crypto';

function resolvePdfPath(filePath) {
  const possiblePaths = [];
  possiblePaths.push(join(process.cwd(), "server", "bills", filePath));
  possiblePaths.push(resolve(process.cwd(), "server", "bills", filePath));
  if (process.env.NETLIFY || process.env.NITRO_PRESET === "netlify") {
    possiblePaths.push(join(".", "bills", filePath));
  }
  for (const path of possiblePaths) {
    try {
      if (existsSync(path)) {
        return path;
      }
    } catch {
      continue;
    }
  }
  return join(process.cwd(), "server", "bills", filePath);
}
const _token_ = defineEventHandler(async (event) => {
  const token = getRouterParam(event, "token");
  if (!token) {
    throw createError({
      statusCode: 400,
      statusMessage: "Token is required"
    });
  }
  const filePath = validatePdfToken(token);
  if (!filePath) {
    throw createError({
      statusCode: 403,
      statusMessage: "Invalid or expired token"
    });
  }
  if (filePath.includes("..") || filePath.includes("~")) {
    throw createError({
      statusCode: 403,
      statusMessage: "Invalid file path"
    });
  }
  try {
    const fullPath = resolvePdfPath(filePath);
    const pdfBuffer = await promises.readFile(fullPath);
    setResponseHeaders(event, {
      "Content-Type": "application/pdf",
      "Content-Disposition": `inline; filename="${filePath.split("/").pop()}"`,
      "Cache-Control": "private, no-cache, no-store, must-revalidate",
      "Expires": "0",
      "Pragma": "no-cache"
    });
    return pdfBuffer;
  } catch (error) {
    console.error("Error reading PDF file:", {
      filePath,
      error: error == null ? void 0 : error.message,
      stack: error == null ? void 0 : error.stack
    });
    throw createError({
      statusCode: 404,
      statusMessage: "PDF file not found"
    });
  }
});

export { _token_ as default };
//# sourceMappingURL=_token_.mjs.map
