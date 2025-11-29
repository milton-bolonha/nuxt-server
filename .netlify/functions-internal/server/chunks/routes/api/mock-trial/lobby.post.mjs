import { d as defineEventHandler, b as apiRateLimiter, r as readBody, c as createError } from '../../../_/nitro.mjs';
import 'node:http';
import 'node:https';
import 'node:events';
import 'node:buffer';
import 'node:fs';
import 'node:path';
import 'node:crypto';

const lobby_post = defineEventHandler(async (event) => {
  await apiRateLimiter.middleware()(event);
  const body = await readBody(event);
  const { action, lobbyCode, playerName, role } = body;
  if (!action) {
    throw createError({
      statusCode: 400,
      statusMessage: "Action is required"
    });
  }
  switch (action) {
    case "create":
      return {
        success: true,
        lobbyCode: generateLobbyCode(),
        message: "Lobby created"
      };
    case "join":
      if (!lobbyCode) {
        throw createError({
          statusCode: 400,
          statusMessage: "Lobby code is required"
        });
      }
      return {
        success: true,
        lobbyCode,
        message: "Joined lobby"
      };
    case "leave":
      return {
        success: true,
        message: "Left lobby"
      };
    case "claim-role":
      if (!role) {
        throw createError({
          statusCode: 400,
          statusMessage: "Role is required"
        });
      }
      return {
        success: true,
        role,
        message: "Role claimed"
      };
    default:
      throw createError({
        statusCode: 400,
        statusMessage: "Invalid action"
      });
  }
});
function generateLobbyCode() {
  return Math.random().toString(36).substring(2, 8).toUpperCase();
}

export { lobby_post as default };
//# sourceMappingURL=lobby.post.mjs.map
