import Joi from "joi"

const signInScheme = Joi.object({
    "email":Joi.required(),
    "password":Joi.required()
})

export default signInScheme