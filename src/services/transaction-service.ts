import { transactionRepository } from "../repositories";

async function getUserTransactions(userId: string) {
  const transactions = await transactionRepository.findAllUserTransactions(userId);
  return transactions;
}

const transactionService = {
  getUserTransactions
};

export { transactionService };