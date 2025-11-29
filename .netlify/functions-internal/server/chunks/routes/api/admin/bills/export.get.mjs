import { d as defineEventHandler, a as getQuery, s as setHeader, c as createError } from '../../../../_/nitro.mjs';
import { p as prisma } from '../../../../_/db.mjs';
import 'node:http';
import 'node:https';
import 'node:events';
import 'node:buffer';
import 'node:fs';
import 'node:path';
import 'node:crypto';
import '@prisma/client';

const export_get = defineEventHandler(async (event) => {
  const query = getQuery(event);
  const format = query.format || "json";
  try {
    const bills = await prisma.bill.findMany({
      orderBy: { number: "asc" }
    });
    if (format === "csv") {
      const headers = ["ID", "Number", "Type", "Category", "Description", "PDF Path"];
      const rows = bills.map((b) => [
        b.id,
        `"${b.number}"`,
        b.type,
        b.category,
        `"${(b.description || "").replace(/"/g, '""')}"`,
        b.pdfPath || ""
      ]);
      const csv = [
        headers.join(","),
        ...rows.map((row) => row.join(","))
      ].join("\n");
      setHeader(event, "Content-Type", "text/csv");
      setHeader(event, "Content-Disposition", 'attachment; filename="bills.csv"');
      return csv;
    }
    setHeader(event, "Content-Type", "application/json");
    setHeader(event, "Content-Disposition", 'attachment; filename="bills.json"');
    return bills;
  } catch (error) {
    console.error("Export error:", error);
    throw createError({
      statusCode: 500,
      message: "Failed to export bills"
    });
  }
});

export { export_get as default };
//# sourceMappingURL=export.get.mjs.map
