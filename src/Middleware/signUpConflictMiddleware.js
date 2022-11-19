import { usersCollection } from "../DataBase/db.js"


export default async function signUpConflict(req, res, next) {
    const userInfo = req.body
    try {
        const userExist = await usersCollection.findOne({ email: userInfo.email })
        if (userExist) {
            return res.sendStatus(409)
        }
    } catch (err) {
        console.log(err)
        res.sendStatus(500)
    }
    next()
}