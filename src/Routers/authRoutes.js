import { Router } from "express"
import { postSignIn, postSignUp } from "../Controllers/authController.js"
import signInAuth from "../Middleware/signInAuthMiddleware.js"
import signUpConflict from "../Middleware/signUpConflictMiddleware.js"
import signUpValidate from "../Middleware/signUpValidateMiddleware.js"
import signInValidate from "../Middleware/signInValidateMiddleware.js"
const router = Router()

router.post("/sign-up", signUpConflict, signUpValidate, postSignUp)

router.post("/sign-in", signInValidate, signInAuth, postSignIn)

export default router