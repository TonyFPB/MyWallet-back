import { Response } from "express"
import httpStatus from "http-status"

import { transactionService } from "../services"
import { AuthenticatedRequest } from "../middlewares"
import { NewTransaction } from "../schemas"

export async function postTransaction(req: AuthenticatedRequest, res: Response) {
  const userId = req.userId as string;
  const transaction = req.body as NewTransaction;

  try {
    const newTransaction = await transactionService.createNewTransaction(userId, transaction);
    res.sendStatus(httpStatus.CREATED);
  } catch (err) {
    console.log(err)
    res.sendStatus(httpStatus.INTERNAL_SERVER_ERROR)
  }
}

export async function getTransactions(req: AuthenticatedRequest, res: Response) {
  const userId = req.userId as string;

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
