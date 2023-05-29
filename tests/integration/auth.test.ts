import app from "../../src/app";
import supertest from "supertest";
import { cleanDb } from "../helpers";
import httpStatus from "http-status";
import { userFactory } from "../factories";
import { faker } from "@faker-js/faker";
import { prisma } from "database/db";


const server = supertest(app);
beforeAll(async () => {
  cleanDb();
})

describe("POST /sign-up", () => {
  it("should respond with status 400 when body does not exists", async () => {
    const response = await server.post("/auth/sign-up");

    expect(response.status).toBe(httpStatus.BAD_REQUEST);
  })
  it("should respond with status 400 when is a invalid body", async () => {
    const invalidBody = {
      name: faker.number.int(),
      email: faker.person.firstName(),
      password: faker.lorem.word(5)
    };

    const response = await server.post("/auth/sign-up").send(invalidBody);

    expect(response.status).toBe(httpStatus.BAD_REQUEST);
  })
  it("should respond with status 409 when has a conflict with the email", async () => {
    const userConflict = await userFactory.createUser();
    const bodyUser = {
      name: faker.person.firstName(),
      email: userConflict.email,
      password: faker.lorem.word(8)
    };

    const response = await server.post("/auth/sign-up").send(bodyUser);

    expect(response.status).toBe(httpStatus.CONFLICT);
  })
  it("should resposnd with status 201 and create a user", async () => {
    const bodyUser = {
      name: faker.person.firstName(),
      email: faker.internet.email(),
      password: faker.lorem.word(8)
    };

    const response = await server.post("/auth/sign-up").send(bodyUser);
    const newUser = await prisma.user.findUnique({ where: { email: bodyUser.email } });
    expect(response.status).toBe(httpStatus.CREATED);
    expect({
      name: newUser?.name,
      email: newUser?.email,
    }).toEqual({
      name: bodyUser.name,
      email: bodyUser.email
    });
  })

})