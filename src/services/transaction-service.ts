import dayjs from "dayjs";

import { NewTransaction } from "../schemas";
import { transactionRepository } from "../repositories";

async function getUserTransactions(userId: string) {
  const transactions = await transactionRepository.findAllUserTransactions(userId);
  return transactions;
}

async function createNewTransaction(userId: string, transaction: NewTransaction) {
  const date = dayjs().toISOString()
  
  const newTransaction = await transactionRepository.createTransaction(
    userId,
    transaction.value,
    transaction.description,
    transaction.type,
    date
  )
  return newTransaction;
}

const transactionService = {
  getUserTransactions,
  createNewTransaction
};

export { transactionService };