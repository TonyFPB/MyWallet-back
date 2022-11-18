import { sessionsCollection, transactionsCollection } from "../DataBase/db.js"

// {_id:adsasd, userId:asjdfiujashdf, transactions:[{value:asdfasd,description:asidhga,type:enter or out}]}
// findOne(userId)

export async function postTransaction(req, res) {
    // body = {value:'', description:"",type:""}
    const userId = req.userId
    const transaction = req.transaction

    try {
        const userTransactions = await transactionsCollection.findOne({ userId })
        const newTransactions = [...userTransactions.transactions, transaction]
        console.log({...userTransactions, transactions:newTransactions})
        await transactionsCollection.updateOne({userId},{$set:{...userTransactions, transactions:newTransactions}})
        res.send("ok")
    } catch (err) {
        console.log(err)
        res.sendStatus(500)
    }

}
