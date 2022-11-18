import { usersCollection } from "../DataBase/db.js"
import bcrypt from "bcrypt"

export default async function signInAuth(req, res, next) {
    const userInfo = req.body
    const user = await usersCollection.findOne({ email: userInfo.email })
    if (!user || !bcrypt.compareSync(userInfo.password, user.password)) {
        return res.sendStatus(401)
    }
    req.user = user
    next()
}