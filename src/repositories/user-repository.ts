import { prisma } from "../database/db";

async function findUserByEmail(email: string) {
  return prisma.user.findUnique({
    where: { email },
  });
}

async function createNewUser(name: string, email: string, password: string) {
  return prisma.user.create({
    data: {
      name,
      email,
      password,
    }
  })
}

const userRepository = {
  findUserByEmail,
  createNewUser
};

export { userRepository };
