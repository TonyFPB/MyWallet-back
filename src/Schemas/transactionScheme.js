import Joi from "joi"

const transactionsScheme = Joi.object({
    "value":Joi.number().required(),
    "description":Joi.string().trim().required(),
    "type":Joi.string().valid("deposit","withdraw").required()
})

export default transactionsScheme