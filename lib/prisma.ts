import { PrismaClient } from "@prisma/client";

// Module-level variable to store the Prisma client
let prisma: PrismaClient;

// Initialize the Prisma client
export const client = prisma || new PrismaClient();

// Assign the client to the module-level variable in non-production environments
if (process.env.NODE_ENV !== 'production') prisma = client;