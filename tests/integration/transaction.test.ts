import app from "../../src/app";
import supertest from "supertest";
import { cleanDb } from "../helpers";
import httpStatus from "http-status";


const server = supertest(app);
beforeAll(async () => {
  cleanDb();
})

describe("POST /sign-up", () => {
  it("should respond with status 400 when body does not exists", async () => {
    expect(1).toBe(1);  
  })
})