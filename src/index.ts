import express from "express"
import cors from "cors"
import prisma  from "./database/db"
import { authRouter } from "./routers"
// import authRouter from './Routers/authRoutes.js'
// import transactionsRouters from "./Routers/transactionsRoutes.js"

const app = express()
app.use(cors())
app.use(express.json())
app.use(authRouter)
// app.use(transactionsRouters)

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