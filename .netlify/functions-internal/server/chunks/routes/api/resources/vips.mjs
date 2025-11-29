import { d as defineEventHandler, c as createError } from '../../../_/nitro.mjs';
import { v as validateApiAccess } from '../../../_/validateApiAccess.mjs';
import 'node:http';
import 'node:https';
import 'node:events';
import 'node:buffer';
import 'node:fs';
import 'node:path';
import 'node:crypto';
import '../../../_/apiTokens.mjs';
import 'crypto';

const vips$1 = [
  { userId: "731724654", title: "Retired Justice", reason: "Bob" },
  { userId: "25439051", title: "Disgrace", reason: "Bob" },
  { userId: "12018674", title: "Senior Counsel to the Clerk of the Court", reason: "Bob" },
  { userId: "526267693", title: "Retired Judge in Active Service", reason: "Bob" },
  { userId: "28563851", title: "Retired Justice", reason: "Bob" },
  { userId: "173567162", title: "Retired Justice", reason: "Bob" },
  { userId: "1118551761", title: "Retired Judge", reason: "Bob" },
  { userId: "57480164", title: "Retired Justice", reason: "Bob" },
  { userId: "35066678", title: "Retired Justice", reason: "Bob" },
  { userId: "62419630", title: "Clerk of the Court", reason: "Bob" },
  { userId: "69665369", title: "Clerk of the Supreme Court", reason: "Bob" },
  { userId: "116389487", title: "Assistant Clerk of the Court", reason: "Owner of this website" }
];

const vips = defineEventHandler(async (event) => {
  validateApiAccess(event, "resources/vips");
  try {
    return vips$1;
  } catch (error) {
    console.error("Error fetching VIPs:", error);
    throw createError({
      statusCode: 500,
      message: "Failed to fetch VIPs"
    });
  }
});

export { vips as default };
//# sourceMappingURL=vips.mjs.map
