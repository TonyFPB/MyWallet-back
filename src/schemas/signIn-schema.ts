import Joi from "joi"

const signInSchema: Joi.ObjectSchema<UserSignIn> = Joi.object({
  "email":Joi.string().email().required(),
  "password":Joi.string().required()
})

export type UserSignIn = {
  email: string
  password: string
};

export { signInSchema };