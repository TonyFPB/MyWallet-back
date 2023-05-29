import { PrismaClient } from "@prisma/client"
import dotenv from "dotenv";

const loadEnv = () => {
  let path;
  if (process.env.NODE_ENV === "test") {
    path = ".env.test";
  } else if (process.env.NODE_ENV === "development") {
    path = ".env.dev";
  } else {
    path = ".env";
  }
  // console.log(dotenv.config({ path }));
  dotenv.config({ path });
  
}

// dotenv.config()
loadEnv()

// console.log(process.env.TYPE);
// const mongoClient = new MongoClient(process.env.MONGO_URI)
export let prisma: PrismaClient = new PrismaClient();
