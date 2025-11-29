import crypto__default from 'crypto';

const SECRET_KEY = process.env.TOKEN_SECRET || "your-secret-key-change-in-production";
const TOKEN_EXPIRY_MINUTES = process.env.TOKEN_EXPIRY ? parseFloat(process.env.TOKEN_EXPIRY) : 5;
const TOKEN_EXPIRY_MS = TOKEN_EXPIRY_MINUTES * 60 * 1e3;
function generateApiToken(endpoint) {
  const expiresAt = Date.now() + TOKEN_EXPIRY_MS;
  const payload = {
    endpoint,
    expiresAt
  };
  const payloadStr = JSON.stringify(payload);
  const payloadBase64 = Buffer.from(payloadStr).toString("base64url");
  const signature = crypto__default.createHmac("sha256", SECRET_KEY).update(payloadBase64).digest("base64url");
  return `${payloadBase64}.${signature}`;
}
function validateApiToken(token, expectedEndpoint) {
  try {
    const [payloadBase64, signature] = token.split(".");
    if (!payloadBase64 || !signature) {
      return false;
    }
    const expectedSignature = crypto__default.createHmac("sha256", SECRET_KEY).update(payloadBase64).digest("base64url");
    if (signature !== expectedSignature) {
      return false;
    }
    const payloadStr = Buffer.from(payloadBase64, "base64url").toString();
    const payload = JSON.parse(payloadStr);
    if (Date.now() > payload.expiresAt) {
      return false;
    }
    if (payload.endpoint !== expectedEndpoint) {
      return false;
    }
    return true;
  } catch (error) {
    return false;
  }
}

export { generateApiToken as g, validateApiToken as v };
//# sourceMappingURL=apiTokens.mjs.map
