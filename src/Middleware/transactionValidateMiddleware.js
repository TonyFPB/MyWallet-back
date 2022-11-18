import transactionsScheme from "../Schemas/transactionScheme.js"

export default function transactionValidateMiddleware(req,res,next){
    const transaction = req.body

    const validate = transactionsScheme.validate(transaction, {abortEarly:false})

    if(validate.error){
        const errors = validate.error.details.map(d=>d.message)
        return res.status(422).send({message:errors})
    }
    req.transaction = validate.value
    next()
}