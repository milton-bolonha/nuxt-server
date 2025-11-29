import { d as defineEventHandler, a as getQuery, c as createError } from '../../_/nitro.mjs';
import { p as prisma } from '../../_/db.mjs';
import 'node:http';
import 'node:https';
import 'node:events';
import 'node:buffer';
import 'node:fs';
import 'node:path';
import 'node:crypto';
import '@prisma/client';

const search_get = defineEventHandler(async (event) => {
  var _a;
  const query = getQuery(event);
  const searchTerm = query.q || "";
  const types = ((_a = query.types) == null ? void 0 : _a.split(",")) || [];
  if (!searchTerm || searchTerm.length < 2) {
    return { results: [] };
  }
  try {
    const results = [];
    if (!types.length || types.includes("bills")) {
      const bills = await prisma.bill.findMany({
        where: {
          OR: [
            { number: { contains: searchTerm, mode: "insensitive" } },
            { description: { contains: searchTerm, mode: "insensitive" } }
          ]
        },
        take: 10,
        orderBy: { number: "asc" }
      });
      results.push(...bills.map((b) => ({
        type: "bill",
        id: b.id,
        title: b.number,
        description: b.description,
        category: b.category,
        data: b
      })));
    }
    if (!types.length || types.includes("laws")) {
      const laws = await prisma.law.findMany({
        where: {
          OR: [
            { title: { contains: searchTerm, mode: "insensitive" } },
            { uscode: { contains: searchTerm, mode: "insensitive" } },
            { description: { contains: searchTerm, mode: "insensitive" } }
          ]
        },
        take: 10,
        orderBy: { title: "asc" }
      });
      results.push(...laws.map((l) => ({
        type: "law",
        id: l.id,
        title: l.title,
        description: l.description,
        data: l
      })));
    }
    if (!types.length || types.includes("definitions")) {
      const definitions = await prisma.definition.findMany({
        where: {
          OR: [
            { title: { contains: searchTerm, mode: "insensitive" } },
            { description: { contains: searchTerm, mode: "insensitive" } }
          ]
        },
        take: 10,
        orderBy: { title: "asc" }
      });
      results.push(...definitions.map((d) => ({
        type: "definition",
        id: d.id,
        title: d.title,
        description: d.description,
        data: d
      })));
    }
    if (!types.length || types.includes("eos")) {
      const eos = await prisma.executiveOrder.findMany({
        where: {
          OR: [
            { number: { contains: searchTerm, mode: "insensitive" } },
            { title: { contains: searchTerm, mode: "insensitive" } },
            { description: { contains: searchTerm, mode: "insensitive" } }
          ]
        },
        take: 10,
        orderBy: { number: "asc" }
      });
      results.push(...eos.map((e) => ({
        type: "executive-order",
        id: e.id,
        title: `${e.number}: ${e.title}`,
        description: e.description,
        data: e
      })));
    }
    return { results, total: results.length };
  } catch (error) {
    console.error("Search error:", error);
    throw createError({
      statusCode: 500,
      message: "Search failed"
    });
  }
});

export { search_get as default };
//# sourceMappingURL=search.get.mjs.map
