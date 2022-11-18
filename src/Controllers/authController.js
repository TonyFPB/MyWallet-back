import bcrypt from "bcrypt"
import { v4 as uuidV4 } from "uuid"
import { sessionsCollection, transactionsCollection, usersCollection } from "../DataBase/db.js"

export async function postSignUp(req, res) {
    const user = req.user
    try {
        const passwordHash = bcrypt.hashSync(user.password, 10)
        await usersCollection.insertOne({ ...user, password: passwordHash })
        res.send(201)

    } catch (err) {
        console.log(err)
        res.sendStatus(500)
    }

}


export async function postSignIn(req, res) {
    const user = req.user
    try {
        const sessionExist = await sessionsCollection.findOne({ userId: user._id })
        if (sessionExist) {
            return res.send({ token: sessionExist.token })
        }
        const createToken = uuidV4()
        await sessionsCollection.insertOne({ token: createToken, userId: user._id })
        await transactionsCollection.insertOne({ userId: user._id, transactions: [] })
        res.send({ token: createToken })
    } catch (err) {
        console.log(err)
        res.sendStatus(500)
    }

}