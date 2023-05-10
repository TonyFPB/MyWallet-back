import prisma from "../DataBase/db";

async function findSession(token: string) {
  return prisma.session.findUnique({
    where: { token }
  });
}


const sessionRepository = {
  findSession
};

export { sessionRepository };
