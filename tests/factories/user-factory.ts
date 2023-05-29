import bcrypt from "bcrypt";
import { faker } from "@faker-js/faker";
import * as jwt from "jsonwebtoken";
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

async function generateValidToken() {
  const user = await createUser();
  const token = jwt.sign({ userId: user.id }, process.env.JWT_SECRET as string, { expiresIn: 864000 });

  await prisma.session.create({
    data: {
      userId: user.id,
      token: token
    }
  })
  
  return { user, token };
}

const userFactory = {
  createUser,
  generateValidToken
}

export { userFactory };