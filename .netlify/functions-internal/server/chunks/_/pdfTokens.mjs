import crypto__default from 'crypto';

const SECRET_KEY = process.env.TOKEN_SECRET || "your-secret-key-change-in-production";
const TOKEN_EXPIRY_MINUTES = process.env.TOKEN_EXPIRY ? parseFloat(process.env.TOKEN_EXPIRY) : 5;
const TOKEN_EXPIRY_MS = TOKEN_EXPIRY_MINUTES * 60 * 1e3;
function generatePdfToken(filePath) {
  const expiresAt = Date.now() + TOKEN_EXPIRY_MS;
  const payload = {
    filePath,
    expiresAt
  };
  const payloadStr = JSON.stringify(payload);
  const payloadBase64 = Buffer.from(payloadStr).toString("base64url");
  const signature = crypto__default.createHmac("sha256", SECRET_KEY).update(payloadBase64).digest("base64url");
  return `${payloadBase64}.${signature}`;
}
function validatePdfToken(token) {
  try {
    const [payloadBase64, signature] = token.split(".");
    if (!payloadBase64 || !signature) {
      return null;
    }
    const expectedSignature = crypto__default.createHmac("sha256", SECRET_KEY).update(payloadBase64).digest("base64url");
    if (signature !== expectedSignature) {
      return null;
    }
    const payloadStr = Buffer.from(payloadBase64, "base64url").toString();
    const payload = JSON.parse(payloadStr);
    if (Date.now() > payload.expiresAt) {
      return null;
    }
    return payload.filePath;
  } catch (error) {
    return null;
  }
}

export { generatePdfToken as g, validatePdfToken as v };
//# sourceMappingURL=pdfTokens.mjs.map
