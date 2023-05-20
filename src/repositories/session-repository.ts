import prisma from "../database/db";

async function findSession(userId: string) {
  return prisma.session.findUnique({
    where: { userId }
  });
}

async function findSessionByToken(token: string) {
  return prisma.session.findFirst({
    where: { token }
  })
}

async function create(userId: string, token: string) {
  return prisma.session.create({
    data: {
      userId,
      token
    }
  })
}

async function deleteSession(id: string) {
  return prisma.session.delete({
    where: { id }
  })
}


const sessionRepository = {
  findSession,
  findSessionByToken,
  create,
  deleteSession
};

export { sessionRepository };
