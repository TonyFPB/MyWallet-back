import { Router } from "express"
// postSignIn,
import {  postSignUp, postSignIn } from "../controllers/auth-controller"
import { validateBody } from "../middlewares/index";
import { signInSchema, signUpUserSchema } from "../schemas";

// import signInAuth from "../Middleware/signInAuthMiddleware.js"
// import signUpConflict from "../Middleware/signUpConflictMiddleware.js"
// import signUpValidate from "../Middleware/signUpValidateMiddleware.js"
// import signInValidate from "../Middleware/signInValidateMiddleware.js"
const authRouter = Router()

authRouter
  .post("/sign-up", validateBody(signUpUserSchema) , postSignUp)
  .post("/sign-in", validateBody(signInSchema), postSignIn);

// router.post("/sign-in", signInValidate, signInAuth, postSignIn)

export { authRouter };