import { Router } from "express"
import { postsignIn, postSignUp } from "../Controllers/authController.js"

const router = Router()

router.post("/sign-up", postSignUp)

router.post("/sign-in", postsignIn)

export default router