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

const courtProcedures = [
  { title: "File Case", description: "Prosecution files the case with CI and Affidavit", category: "criminal" },
  { title: "Summons Delivery", description: "Court procures and delivers summons", category: "criminal" },
  { title: "Arraignment", description: "Arraignment (doesn't happen if held in absentia)", category: "criminal" },
  { title: "Pre-trial Motions", description: "Pre-trial motions", category: "criminal" },
  { title: "Trial Scheduling", description: "Scheduling for trial", category: "criminal" },
  { title: "Opening Statements", description: "Opening statements (Prosecution), Opening Statements (Defense)", category: "criminal" },
  { title: "Witness 1 Prosecution", description: "Witness 1 (Prosecution), Cross-Examination (Defense)", category: "criminal" },
  { title: "Witness 2 Prosecution", description: "Witness 2 (Prosecution), Cross-Examination (Defense)", category: "criminal" },
  { title: "Witness 3 Prosecution", description: "Witness 3 (Prosecution), Cross-Examination (Defense)", category: "criminal" },
  { title: "Witness 1 Defense", description: "Witness 1 (Defense), Cross-Examination (Prosecution)", category: "criminal" },
  { title: "Witness 2 Defense", description: "Witness 2 (Defense), Cross-Examination (Prosecution)", category: "criminal" },
  { title: "Witness 3 Defense", description: "Witness 3 (Defense), Cross-Examination (Prosecution)", category: "criminal" },
  { title: "Closing Statements", description: "Closing Statements (Prosecution), Closing Statements (Defense)", category: "criminal" }
];

const courtProcedure = defineEventHandler(async (event) => {
  validateApiAccess(event, "resources/court-procedure");
  try {
    return courtProcedures.map((p) => p.description);
  } catch (error) {
    console.error("Error fetching court procedures:", error);
    throw createError({
      statusCode: 500,
      message: "Failed to fetch court procedures"
    });
  }
});

export { courtProcedure as default };
//# sourceMappingURL=court-procedure.mjs.map
