import { usersCollection } from "../DataBase/db.js"


export default async function signUpConflict(req, res, next) {
    const userInfo = req.body
    const userExist = await usersCollection.findOne({ email: userInfo.email })
    if (userExist) {
        return res.sendStatus(409)
    }
    next()
}