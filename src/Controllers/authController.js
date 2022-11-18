import { signUpUserScheme} from "../index.js"
import bcrypt from "bcrypt"
import { v4 as uuidV4 } from "uuid"
import { sessionsCollection, transactionsCollection, usersCollection } from "../DataBase/db.js"

export async function postSignUp(req, res) {
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

}


export async function postsignIn(req, res){
    const userInfo = req.body
    try {
        const user = await usersCollection.findOne({ email: userInfo.email })
        if (!user || !bcrypt.compareSync(userInfo.password, user.password)) {
            return res.sendStatus(401)
        }

        const sessionExist = await sessionsCollection.findOne({ userId: user._id })
        if (sessionExist) {
            return res.send({ token: sessionExist.token })
        }
        const createToken = uuidV4()
        await sessionsCollection.insertOne({ token: createToken, userId: user._id })
        await transactionsCollection.insertOne({userId: user._id , transactions:[]})
        res.send({ token: createToken })
    } catch (err) {
        console.log(err)
        res.sendStatus(500)
    }

}