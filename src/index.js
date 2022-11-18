import express from "express"
import cors from "cors"
import authRouter from './Routers/authRoutes.js'
import transactionsRouters from "./Routers/transactionsRoutes.js"

const app = express()
app.use(cors())
app.use(express.json())
app.use(authRouter)
app.use(transactionsRouters)

app.listen(5000, () => console.log("Port 5000"))