const createHttpError = require('http-errors')
const Validators = require('../validators/schemaValidation')

module.exports = function (validator) {
    
    if (!Validators.hasOwnProperty(validator))
        throw new Error(`'${validator}' validator is not exist`)
    
    return async function (req, res, next) {
        try {
            const validated = await Validators[validator].validateAsync(req.body)
            req.body = validated
            next()
        } catch (err) {
            //* Pass err to next
            if (err.isJoi)
                return res.send(createHttpError(422, { message: err.message }))
            next(createHttpError(500))
        }
    }
}