import { Router } from "express"
// postSignIn,
import {  postSignUp } from "../Controllers/auth-controller"
import { validateBody } from "../Middleware/index";
import signUpUserScheme from "../Schemas/signUp-schema";
// import signInAuth from "../Middleware/signInAuthMiddleware.js"
// import signUpConflict from "../Middleware/signUpConflictMiddleware.js"
// import signUpValidate from "../Middleware/signUpValidateMiddleware.js"
// import signInValidate from "../Middleware/signInValidateMiddleware.js"
const authRouter = Router()

authRouter.post("/sign-up", validateBody(signUpUserScheme) , postSignUp)

// router.post("/sign-in", signInValidate, signInAuth, postSignIn)

export { authRouter };