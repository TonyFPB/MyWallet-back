import { faker } from "@faker-js/faker";


function generateValidTransactionBody(){
  return {
    value:faker.number.int(),
    description: faker.lorem.sentence(2),
    type: Math.floor(Math.random()*2) ? "deposit" : "withdraw"
  };
}

const transactionFactory = {
  generateValidTransactionBody
};

export { transactionFactory }