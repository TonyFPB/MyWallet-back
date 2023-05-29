import bcrypt from "bcrypt";
import { faker } from "@faker-js/faker";
import { prisma } from "../../src/database/db";
import { User } from "@prisma/client";


async function createUser(params: Partial<User> = {}) {
  const password = params.password || faker.lorem.word(8);
  const hashPassword = bcrypt.hashSync(password, 10);

  const user = await prisma.user.create({
    data: {
      name: faker.person.firstName(),
      email: params.email || faker.internet.email(),
      password: hashPassword
    }
  })

  return user;
}

const userFactory = {
  createUser
}

export { userFactory };