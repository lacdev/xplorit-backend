import { ApiError } from '../../errors/ApiError.js'
import validator from 'express-validator'
import { isEmptyArray } from '../../utils/checkForEmptyArray.js'
import { searchForUserBeforeCreation } from '../../usecases/userUsecases/searchUserBeforeCreation.js'
import { getSinglePlace } from '../../usecases/placeUsecases/getSinglePlace.js'
import { getLikesFromPlace } from '../../usecases/likeUsecases/getLikesFromPlace.js'
const { body, validationResult } = validator

const validateLikeToSave = async (req, res, next) => {
    const {userId, placeId} = req.body
    try {
        const userIdChain = body('userId')
            .exists()
            .withMessage('Please provide a user ID.')
            .isMongoId()
            .withMessage('Please provide a valid ID.')
            .run(req)

        const placeIDChain = body('placeId')
            .exists()
            .withMessage('Please provide a valid placeId.')
            .isMongoId()
            .withMessage('Please prove a valid ID.')
            .run(req)    

        await userIdChain
        await placeIDChain

        const result = validationResult(req)

        if (!result.isEmpty()) {
        next(
          ApiError.badRequest({ message: 'Bad Request', errors: result.array() })
        )
        return
        }

        const validatePlace = await getSinglePlace (placeId)
      
        if (isEmptyArray(validatePlace)) {
            next (ApiError.badRequest('No place found to post Like.'))
        }

        const validateLike = await getLikesFromPlace({_id: userId})

        if (!isEmptyArray(validateLike)) {
            next(ApiError.badRequest('like not found.'))
            return
          }
      
       

        next()
    }   catch (err){
        console.error(err)
        next(ApiError.badRequest('No valid request to query a specific like'))
    }
}

export { validateLikeToSave }