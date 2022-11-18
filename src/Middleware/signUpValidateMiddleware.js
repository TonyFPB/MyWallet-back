import signUpUserScheme from "../Schemas/signUpScheme.js"

export default function signUpValidate(req, res, next) {
    const userInfo = req.body
    const validation = signUpUserScheme.validate(userInfo, { abortEarly: false })
    if (validation.error) {
        const errors = validation.error.details.map(d => d.message)
        return res.status(400).send({ message: errors })
    }
    req.user = validation.value
    next()
}