import { transactionsCollection } from "../DataBase/db.js"

export async function postTransaction(req, res) {
    const userId = req.userId
    const transaction = req.transaction

    try {
        const userTransactions = await transactionsCollection.findOne({ userId })
        const newTransactions = [...userTransactions.transactions, transaction]
        await transactionsCollection.updateOne({ userId }, { $set: { ...userTransactions, transactions: newTransactions } })
        res.sendStatus(200)
    } catch (err) {
        console.log(err)
        res.sendStatus(500)
    }

}
