import { Router } from "express"

import {  postSignUp, postSignIn } from "../controllers"
import { validateBody } from "../middlewares";
import { signInSchema, signUpUserSchema } from "../schemas";

const authRouter = Router()

authRouter
  .post("/sign-up", validateBody(signUpUserSchema) , postSignUp)
  .post("/sign-in", validateBody(signInSchema), postSignIn);

export { authRouter };