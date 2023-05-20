import express from "express"
import cors from "cors"
import prisma  from "./database/db"
import { authRouter, transactionRouter } from "./routers"
// import authRouter from './Routers/authRoutes.js'
// import transactionsRouters from "./Routers/transactionsRoutes.js"

const app = express()
app
  .use(cors())
  .use(express.json())
  .use("/auth",authRouter)
  .use("/transactions",transactionRouter)

app.post("/", async (req, res) => {
  try { 
    // await prisma.user.create({
    //   data:{
    //     name:"aaaaa",
    //     email:"dsadasd",
    //     password:"dasdasdasdasdasd"
    //   }
    // });
    console.log(await prisma.user.findMany());
    res.send("Ok")
  } catch (err) {
    console.log(err)
    res.sendStatus(500)
  }
})

const port = process.env.PORT || 5000

app.listen(port, () => console.log(`Server running in port ${port}`))