import { ApiError } from '../../errors/ApiError.js'
import validator from 'express-validator'
import { isEmptyObject } from '../../utils/checkForEmpyObject.js'
import { getLikesFromPlace } from '../../usecases/likeUsecases/getLikesFromPlace.js'
const  { param, validationResult } = validator

const validatePlaceRetrieve = async (req, res, next) => {
    try{
    const { placeId } = req.params
        
    const placeIDChain = param('placeId')
        .exists()
        .withMessage('Please provide a like ID.')
        .isMongoId()
        .withMessage('Please provide a valid ID.')
        .run(req)

    await placeIDChain

    const result = validationResult(req)

    if(!result.isEmpty()) {
        next(
            ApiError.badRequest({message: 'Bad Request', errors: result.array()})
        )
        return
    }

   

    if (isEmptyObject(allLikesInPlace)) {
       next(ApiError.notFound('Like not found')) 
       return
    }
    next()
    } catch(err) {
        console.error(err)
        next(ApiError.badRequest('No valid request to query a specific like.'))
    }
}

export { validatePlaceRetrieve }