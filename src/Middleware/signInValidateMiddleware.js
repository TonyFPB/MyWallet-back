import signInScheme from "../Schemas/signInScheme.js";

export default function signInValidate(req, res, next) {
    const user = req.body

    const validation = signInScheme.validate(user, { abortEarly: false })

    if (validation.error) {
        const errors = validation.error.details.map(d => d.message)
        return res.status(422).send({ message: errors })
    }
    next()
}