import { d as defineEventHandler, c as createError } from '../../../_/nitro.mjs';
import { v as validateApiAccess } from '../../../_/validateApiAccess.mjs';
import { p as prisma } from '../../../_/db.mjs';
import 'node:http';
import 'node:https';
import 'node:events';
import 'node:buffer';
import 'node:fs';
import 'node:path';
import 'node:crypto';
import '../../../_/apiTokens.mjs';
import 'crypto';
import '@prisma/client';

const files = defineEventHandler(async (event) => {
  validateApiAccess(event, "resources/files");
  try {
    const data = await prisma.file.findMany({
      orderBy: { title: "asc" }
    });
    return data.map((file) => ({
      title: file.title,
      link: file.fileUrl
    }));
  } catch (error) {
    console.error("Error fetching files:", error);
    throw createError({
      statusCode: 500,
      message: "Failed to fetch files"
    });
  }
});

export { files as default };
//# sourceMappingURL=files.mjs.map
