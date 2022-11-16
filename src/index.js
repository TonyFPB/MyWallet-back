import express from "express"
import cors from "cors"
import { MongoClient } from "mongodb"
import { v4 as uuidV4 } from "uuid"
import Joi from "joi"
import dotenv from "dotenv"
import bcrypt from "bcrypt"

const signUpUserScheme = Joi.object({
    name: Joi.string().trim().min(3).required(),
    email: Joi.string().trim().email().required(),
    password: Joi.string().alphanum().trim().min(6).required()
})


dotenv.config()
const app = express()
app.use(cors())
app.use(express.json())


const mongoClient = new MongoClient(process.env.MONGO_URI)

try {
    await mongoClient.connect()
    console.log("deu bom")
} catch (err) {
    console.log(err)
}

const db = mongoClient.db("myWallet")
const usersCollection = db.collection("users")
const sessionsCollection = db.collection("sessions")


app.post("/sign-up", async (req, res) => {
    const userInfo = req.body
    try {
        const userExist = await usersCollection.findOne({ email: userInfo.email })
        if (userExist) {
            return res.sendStatus(409)
        }
        const validation = signUpUserScheme.validate(userInfo, { abortEarly: false })
        if (validation.error) {
            const errors = validation.error.details.map(d => d.message)
            return res.status(400).send({ message: errors })
        }
        const user = validation.value
        const passwordHash = bcrypt.hashSync(user.password, 10)
        await usersCollection.insertOne({ ...user, password: passwordHash })
        res.send(201)

    } catch (err) {
        console.log(err)
        res.sendStatus(500)
    }

})

app.post("/sign-in", async (req, res) => {
    const userInfo = req.body
    try {
        const user = await usersCollection.findOne({ email: userInfo.email })
        const comparePassword = bcrypt.compareSync(userInfo.password, user.password)
        if (!user || !comparePassword) {
            return res.sendStatus(401)
        }

        const sessionExist = await sessionsCollection.findOne({ userId: user._id })
        if (sessionExist) {
            return res.send({ token: sessionExist.token })
        }
        const createToken = uuidV4()
        await sessionsCollection.insertOne({ token: createToken, userId: user._id })
        res.send({ token: createToken })
    } catch (err) {
        console.log(err)
        res.sendStatus(500)
    }

})


app.listen(5000, () => console.log("Port 5000"))