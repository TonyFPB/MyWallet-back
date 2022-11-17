import express from "express"
import cors from "cors"
import { MongoClient } from "mongodb"
import Joi from "joi"
import dotenv from "dotenv"
import { postsignIn, postSignUp } from "./controllers/authController.js"

export const signUpUserScheme = Joi.object({
    name: Joi.string().trim().min(3).required(),
    email: Joi.string().trim().email().required(),
    password: Joi.string().alphanum().trim(false).min(6).required()
})

dotenv.config()
const app = express()
app.use(cors())
app.use(express.json())

const mongoClient = new MongoClient(process.env.MONGO_URI)

try {
    await mongoClient.connect()
    console.log("Connected")
} catch (err) {
    console.log(err)
}

const db = mongoClient.db("myWallet")
export const usersCollection = db.collection("users")
export const sessionsCollection = db.collection("sessions")

app.post("/sign-up", postSignUp)

app.post("/sign-in", postsignIn)


app.listen(5000, () => console.log("Port 5000"))