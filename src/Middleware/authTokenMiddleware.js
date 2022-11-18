import { sessionsCollection } from "../DataBase/db.js"

export default async function authToken(req, res, next) {
    const bearerToken = req.headers.token

    const token = bearerToken?.replace('Bearer ', '')
    try {
        const session = await sessionsCollection.findOne({ "token": token })
        if (!session) {
            return res.sendStatus(401)
        }
        req.userId = session.userId
        next()
    } catch (err) {
        console.log(err)
        res.sendStatus(500)
    }

}