import { TransactionType } from "@prisma/client";
import prisma from "../database/db";

async function findAllUserTransactions(userId: string){
  return prisma.transaction.findMany({
    where:{userId},
    select:{
      id: true,
      value: true,
      description:true,
      date:true,
      type:true
    }
  });
}

async function createTransaction(userId: string, value: number, description: string, type: TransactionType, date: string) {
  return prisma.transaction.create({
    data:{
      userId,
      value,
      description,
      type,
      date
    }
  })
}

const transactionRepository = {
  findAllUserTransactions,
  createTransaction
};

export { transactionRepository };
