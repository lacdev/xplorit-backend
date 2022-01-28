import { ApiError } from '../../errors/ApiError.js'
import validator from 'express-validator'
const { param, validationResult } = validator

const validateGetRoute = async (req, res, next) => {
    try{
        const routeIDChain = param('routeId')
            .exists()
            .withMessage('Please provide a route ID.')
            .isMongoId()
            .withMessage('Please provide a valid ID.')
            .run(req)
        
        await routeIDChain
        
        const result = validationResult(req)

        if(!result.isEmpty()) {
            next(
                ApiError.badRequest({ message: 'Bad Request', errors: result.array()})
            )
            return
        }
    
        next()
    } catch (err) {
        console.log(err)
    }
}

export { validateGetRoute }