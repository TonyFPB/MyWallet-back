import app from "../../src/app";
import supertest from "supertest";
import { cleanDb } from "../helpers";
import httpStatus from "http-status";
import * as jwt from "jsonwebtoken";
import { faker } from "@faker-js/faker";
import { transactionFactory, userFactory } from "../factories";
import { prisma } from "../../src/database/db";

const server = supertest(app);
beforeEach(async () => {
  await cleanDb();
})

describe("POST /transactions/new", () => {
  it("should respond with status 401 when token is not given", async () => {
    const response = await server.post("/transactions/new");

    expect(response.status).toBe(httpStatus.UNAUTHORIZED);
  })

  it("should respond with status 401 when token is not valid", async () => {
    const token = faker.lorem.word();
    const response = await server.post("/transactions/new").set("Authorization", `Bearer ${token}`);

    expect(response.status).toBe(httpStatus.UNAUTHORIZED);
  })

  it("should respond with status 401 when there is no session for given token", async () => {
    const user = await userFactory.createUser();
    const token = jwt.sign({ userId: user.id }, process.env.JWT_SECRET as string, { expiresIn: 864000 });

    const response = await server.post("/transactions/new").set("Authorization", `Bearer ${token}`);

    expect(response.status).toBe(httpStatus.UNAUTHORIZED);
  })

  describe("when token is valid", () => {
    it("should respond with status 400 when body is not given", async () => {
      const validUser = await userFactory.generateValidToken();

      const response = await server.post("/transactions/new").set("Authorization", `Bearer ${validUser.token}`);

      expect(response.status).toBe(httpStatus.BAD_REQUEST);
    })

    it("should respond with status 400 when body is invalid", async () => {
      const validUser = await userFactory.generateValidToken();
      const invalidBody = { name: faker.lorem.word() };

      const response = await server.post("/transactions/new").set("Authorization", `Bearer ${validUser.token}`).send(invalidBody);

      expect(response.status).toBe(httpStatus.BAD_REQUEST);
    })

    it("should respond with status 201 and create a new transaction", async () => {
      const validUser = await userFactory.generateValidToken();
      const body = transactionFactory.generateValidTransactionBody();

      const response = await server.post("/transactions/new").set("Authorization", `Bearer ${validUser.token}`).send(body);

      const transaction = await prisma.transaction.findFirst({
        where: {
          description: body.description,
          value: body.value
        }
      })

      expect(response.status).toBe(httpStatus.CREATED);
      expect({
        value: transaction?.value,
        description: transaction?.description,
        type: transaction?.type
      }).toEqual(body);
    })
  })
})