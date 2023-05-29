import { faker } from "@faker-js/faker";
import { prisma } from "../../src/database/db";


async function createUser(email?: string) {
  const user = await prisma.user.create({
    data: {
      name: faker.person.firstName(),
      email: email || faker.internet.email(),
      password: faker.lorem.word(8)
    }
  })

  return user;
}

const userFactory = {
  createUser
}

export { userFactory };