import express from "express"
import cors from "cors"
import { MongoClient } from "mongodb"
import Joi from "joi"
import dotenv from "dotenv"
import bcrypt from "bcrypt"

const signInUserScheme = Joi.object({
    name: Joi.string().trim().min(3).required(),
    email: Joi.string().trim().email(),
    password: Joi.string().alphanum().trim().min(4).required()
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
const users = db.collection("users")


app.post("/sign-up", async (req, res) => {
    const userInfo = req.body
    try {
        const userExist = await users.findOne({ email: userInfo.email })
        if (userExist) {
            return res.sendStatus(409)
        }
        const validation = signInUserScheme.validate(userInfo, { abortEarly: false })
        if (validation.error) {
            const errors = validation.error.details.map(d => d.message)
            res.status(400).send({ message: errors })
        }
        const user = validation.value
        const passwordHash = bcrypt.hashSync(user.password,10)
        await users.insertOne({...user, password:passwordHash})
        res.send(201)
    
    } catch (err) {
        console.log(err)
        res.sendStatus(500)
    }

})


app.listen(5000, () => console.log("Port 5000"))