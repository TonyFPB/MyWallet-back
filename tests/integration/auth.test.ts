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

describe("POST /auth/sign-up", () => {
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

  describe("when body is valid",()=>{
    const generateValidBody = (email?: string) => {
      return {
        name: faker.person.firstName(),
        email: email || faker.internet.email(),
        password: faker.lorem.word(6)
      }
    }
    it("should respond with status 409 when has a conflict with the email", async () => {
      const userConflict = await userFactory.createUser();
      const bodyUser = generateValidBody(userConflict.email);
  
      const response = await server.post("/auth/sign-up").send(bodyUser);
  
      expect(response.status).toBe(httpStatus.CONFLICT);
    })

    it("should resposnd with status 201 and create a user", async () => {
      const bodyUser = generateValidBody();
  
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


})

describe("POST /auth/sign-in", () => {
  it("should respond with status 400 when body does not exists", async () => {
    const response = await server.post("/auth/sign-in");

    expect(response.status).toBe(httpStatus.BAD_REQUEST);
  })

  it("should respond with status 400 when is a invalid body", async () => {
    const invalidBody = {
      email: faker.person.firstName(),
      password: faker.number.int()
    };

    const response = await server.post("/auth/sign-in").send(invalidBody);

    expect(response.status).toBe(httpStatus.BAD_REQUEST);
  })

  it("should respond with status 401 when user credentials are wrong", async () => {
    const user = await userFactory.createUser();
    const body = { email: user.email, password: faker.lorem.word(6) };

    const response = await server.post("/auth/sign-in").send(body);

    expect(response.status).toBe(httpStatus.UNAUTHORIZED);
  })

  describe("when credentials are valid", () => {
    const generateValidBody = () => {
      return {
        email: faker.internet.email(),
        password: faker.lorem.word(6)
      }
    }

    it("should respond with status 200 and return the token user", async () => {
      const body = generateValidBody();
      const user = await userFactory.createUser(body);


      const response = await server.post("/auth/sign-in").send(body);

      const userSession = await prisma.user.findUnique({
        where: { email: user.email },
        include: { Session: true }
      });

      expect(response.status).toBe(httpStatus.OK);
      expect(response.body).toEqual({
        user: userSession?.name,
        token: userSession?.Session?.token
      });
    })
  })

})