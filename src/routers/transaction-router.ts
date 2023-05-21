
// import { getTransactions, postTransaction } from "../Controllers/transactionsController.js";
// import authToken  from "../Middleware/authToken-middleware.js";
// import transactionValidateMiddleware from "../Middleware/transactionValidateMiddleware.js";
import { Router, Response } from "express";
import { authToken, validateBody } from "../middlewares";
import { transactionsSchema } from "../schemas";
import { getTransactions, postTransaction } from "../controllers";

const transactionRouter = Router()

transactionRouter
  .all("/*", authToken)
  .get("/", getTransactions)
  .post("/new", validateBody(transactionsSchema), postTransaction)
  
// router.use(authToken)
// router.get("/transactions", getTransactions)

// router.post("/transactions",transactionValidateMiddleware ,postTransaction)

export { transactionRouter }; 