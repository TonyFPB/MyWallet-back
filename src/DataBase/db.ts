import { PrismaClient } from "@prisma/client"
import { MongoClient } from "mongodb"
import dotenv from "dotenv"

dotenv.config()

// const mongoClient = new MongoClient(process.env.MONGO_URI)
const prisma = new PrismaClient();

async function connect(){}

export default prisma




// try {
//     await mongoClient.connect()
//     console.log("Connected")
// } catch (err) {
//     console.log(err)
// }

// const db = mongoClient.db("myWallet")
// export const usersCollection = db.collection("users")
// export const sessionsCollection = db.collection("sessions")
// export const transactionsCollection = db.collection("transactions")