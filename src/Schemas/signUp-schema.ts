import Joi from "joi"

const signUpUserScheme = Joi.object({
  name: Joi.string().trim().min(3).required(),
  email: Joi.string().trim().email().required(),
  password: Joi.string().alphanum().trim(false).min(6).required()
})

export type NewUser = {
  name: string
  email: string
  password: string
}

export default signUpUserScheme