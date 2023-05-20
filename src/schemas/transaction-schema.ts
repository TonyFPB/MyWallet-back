import Joi from "joi"
import { TransactionType } from "@prisma/client";

const transactionsSchema: Joi.ObjectSchema<NewTransaction> = Joi.object({
  "value":Joi.number().required(),
  "description":Joi.string().trim().required(),
  "type":Joi.string().valid("deposit","withdraw").required()
})

export type NewTransaction = {
  value: number,
  description: string,
  type: TransactionType
};

export { transactionsSchema };
