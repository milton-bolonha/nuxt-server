import { PrismaClient } from '@prisma/client';

var _a;
const prismaClientSingleton = () => {
  return new PrismaClient({
    log: ["error"]
  });
};
const prisma = (_a = globalThis.prisma) != null ? _a : prismaClientSingleton();

export { prisma as p };
//# sourceMappingURL=db.mjs.map
