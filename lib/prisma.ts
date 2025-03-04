import { PrismaClient } from "@prisma/client";

// Module-level variable to store the Prisma client
let prisma: PrismaClient | undefined;

// Initialize the Prisma client only if it's not already assigned
if (!prisma) {
  prisma = new PrismaClient();
}

// Export the client
export const client = prisma;
