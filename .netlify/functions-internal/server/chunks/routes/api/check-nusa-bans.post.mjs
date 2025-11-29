import { d as defineEventHandler, f as defaultRateLimiter, r as readBody, c as createError, e as useRuntimeConfig } from '../../_/nitro.mjs';
import axios from 'axios';
import 'node:http';
import 'node:https';
import 'node:events';
import 'node:buffer';
import 'node:fs';
import 'node:path';
import 'node:crypto';

const checkNusaBans_post = defineEventHandler(async (event) => {
  var _a;
  await defaultRateLimiter.middleware()(event);
  const body = await readBody(event);
  const { userId } = body;
  if (!userId || typeof userId !== "string" || !/^[0-9]+$/.test(userId) || userId.length > 32) {
    throw createError({
      statusCode: 400,
      statusMessage: "Bad Request",
      message: "Invalid user ID: must be a numeric string of 32 characters or less"
    });
  }
  const config = useRuntimeConfig();
  const apiKey = config.nusaApiKey;
  if (!apiKey || typeof apiKey !== "string" || apiKey.trim() === "") {
    console.error("Invalid or missing NUSA_API_KEY");
    throw createError({
      statusCode: 500,
      statusMessage: "Internal Server Error",
      message: "Invalid or missing API key"
    });
  }
  try {
    const response = await axios.get(
      `https://api.nusa.gg/user/${userId}/bans`,
      {
        timeout: 5e3,
        headers: {
          "Accept": "application/json",
          "User-Agent": "nUSA Legal Background Check",
          "x-api-key": apiKey
        }
      }
    );
    if (!response.data || typeof response.data !== "object") {
      throw new Error("Invalid API response structure");
    }
    if (((_a = response.data) == null ? void 0 : _a.data) && response.data.data.length > 0) {
      return {
        result: "DO NOT HIRE",
        reason: "Tier 2: Active nUSA ban found"
      };
    }
    return {
      result: "PASS",
      reason: null
    };
  } catch (error) {
    if (axios.isAxiosError(error)) {
      if (error.response) {
        throw createError({
          statusCode: error.response.status,
          statusMessage: "API Error",
          message: "nUSA API error",
          data: error.response.data
        });
      } else if (error.request) {
        throw createError({
          statusCode: 500,
          statusMessage: "Connection Error",
          message: "No response from nUSA API"
        });
      }
    }
    throw createError({
      statusCode: 500,
      statusMessage: "Internal Server Error",
      message: "Failed to check nUSA bans"
    });
  }
});

export { checkNusaBans_post as default };
//# sourceMappingURL=check-nusa-bans.post.mjs.map
