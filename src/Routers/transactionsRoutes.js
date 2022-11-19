import { Router } from "express";
import { getTransactions, postTransaction } from "../Controllers/transactionsController.js";
import authToken  from "../Middleware/authTokenMiddleware.js";
import transactionValidateMiddleware from "../Middleware/transactionValidateMiddleware.js";

const router = Router()
router.use(authToken)
router.get("/transactions", getTransactions)

router.post("/transactions",transactionValidateMiddleware ,postTransaction)

export default router