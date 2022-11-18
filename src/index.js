import express from "express"
import cors from "cors"
import Joi from "joi"
import authRouter from './Routers/authRoutes.js'
import transactionsRouters from "./Routers/transactionsRoutes.js"
export const signUpUserScheme = Joi.object({
    name: Joi.string().trim().min(3).required(),
    email: Joi.string().trim().email().required(),
    password: Joi.string().alphanum().trim(false).min(6).required()
})

const app = express()
app.use(cors())
app.use(express.json())
app.use(authRouter)
app.use(transactionsRouters)

app.listen(5000, () => console.log("Port 5000"))