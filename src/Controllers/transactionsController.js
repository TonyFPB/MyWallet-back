import { transactionsCollection } from "../DataBase/db.js"
import dayjs from "dayjs"
export async function postTransaction(req, res) {
    const userId = req.userId
    const { value, description, type } = req.transaction

    try {
        await transactionsCollection.insertOne({ userId, value, description, type, date:dayjs().format("DD/MM")})
        res.sendStatus(200)
    } catch (err) {
        console.log(err)
        res.sendStatus(500)
    }

}

export async function getTransactions(req, res) {
    const userId = req.userId

    try {
        const userTransactions = await transactionsCollection.find({ userId }).toArray()
        userTransactions.forEach(t=> delete t.userId)
        res.send({transactions:userTransactions})

    } catch (err) {
        console.log(err)
        res.sendStatus(500)
    }
}
