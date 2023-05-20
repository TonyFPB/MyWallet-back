import dayjs from "dayjs"
import { Response } from "express"
import httpStatus from "http-status"

import { transactionService } from "../services"
import { AuthenticatedRequest } from "../middlewares"
// export async function postTransaction(req, res) {
//     const userId = req.userId
//     const { value, description, type } = req.transaction

//     try {
//         await transactionsCollection.insertOne({ userId, value, description, type, date:dayjs().format("DD/MM")})
//         res.sendStatus(200)
//     } catch (err) {
//         console.log(err)
//         res.sendStatus(500)
//     }

// }

export async function getTransactions(req: AuthenticatedRequest, res: Response) {
  const userId  = req.userId as string;
  
  try {
    const userTransactions = await transactionService.getUserTransactions(userId);
    // const userTransactions = await transactionsCollection.find({ userId }).toArray()
    // userTransactions.forEach(t => delete t.userId)
    res.send({ transactions: userTransactions });
  } catch (err) {
    console.log(err)
    res.sendStatus(httpStatus.INTERNAL_SERVER_ERROR);
  }
}
