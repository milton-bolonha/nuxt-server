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

const files$1 = [
  {
    title: "Notice of Appearance - NOT SET UP",
    fileUrl: "https://example.com/notice-appearance",
    fileType: "pdf",
    category: "legal-forms"
  },
  {
    title: "Motion for Discovery",
    fileUrl: "https://example.com/motion-discovery",
    fileType: "pdf",
    category: "legal-forms"
  },
  {
    title: "Motion to Dismiss - NOT SET UP",
    fileUrl: "https://example.com/motion-dismiss",
    fileType: "pdf",
    category: "legal-forms"
  },
  {
    title: "Motion for Summary Judgement - NOT SET UP",
    fileUrl: "https://example.com/motion-summary",
    fileType: "pdf",
    category: "legal-forms"
  },
  {
    title: "Motion for Recusal - NOT SET UP",
    fileUrl: "https://example.com/motion-recusal",
    fileType: "pdf",
    category: "legal-forms"
  },
  {
    title: "Motion to Quash",
    fileUrl: "https://example.com/motion-quash",
    fileType: "pdf",
    category: "legal-forms"
  },
  {
    title: "Motion for Sanctions",
    fileUrl: "https://example.com/motion-sanctions",
    fileType: "pdf",
    category: "legal-forms"
  },
  {
    title: "Motion for Default Judgment - NOT SET UP",
    fileUrl: "https://example.com/motion-default",
    fileType: "pdf",
    category: "legal-forms"
  }
];

const files = defineEventHandler(async (event) => {
  validateApiAccess(event, "resources/files");
  try {
    return files$1.map((file) => ({
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
