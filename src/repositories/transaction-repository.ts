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

const transactionRepository = {
  findAllUserTransactions
};

export { transactionRepository };
