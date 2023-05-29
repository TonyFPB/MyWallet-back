import { prisma } from "../src/database/db";

export async function cleanDb() {
  await prisma.transaction.deleteMany({});
  await prisma.session.deleteMany({});
  await prisma.user.deleteMany({});
}