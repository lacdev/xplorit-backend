import { ApiError } from '../../errors/ApiError.js'
import validator from 'express-validator'
import { isEmptyArray } from '../../utils/checkForEmptyArray.js'
import { getLikesFromPlace } from '../../usecases/likeUsecases/getLikesFromPlace.js'
import { getSinglePlace } from '../../usecases/placeUsecases/getSinglePlace.js'
import { getSingleUser } from '../../usecases/userUsecases/getSingleUser.js'

const { body, param, validationResult } = validator

const validateLikeDeletionInPlace = async (req, res, next) => {
    try {
        const { placeId } = req.params
        const { userId  } = req.body
  
      //Sanitization and validator chains on user registration requested information from body.
  
      const placeIdChain = param('placeId')
      .exists()
      .withMessage('Please provide a place ID.')
      .isMongoId()
      .withMessage('Please provide a valid place ID.')
      .run(req)

      const userIdChain = body('userId')
      .exists()
      .withMessage('Please provide a user ID.')
      .isMongoId()
      .withMessage('Please provide a valid user ID.')
      .run(req)

      await Promise.all([placeIdChain, userIdChain])

      //Validation on request results
      const result = validationResult(req)
  
      if (!result.isEmpty()) {
        next(
          ApiError.badRequest({ message: 'Bad Request', errors: result.array() })
        )
        return
      }

      //Place exists validation
      const placeExists = await getSinglePlace({ _id: placeId })

      if (isEmptyArray(placeExists)) {
        next(ApiError.badRequest('Place not found.'))
        return
      }

       //userId exists validation
       const userExists = await getSingleUser(userId)

       if (isEmptyArray(userExists)) {
         next(ApiError.badRequest('User not found.'))
         return
       }
      
      // like exists validation
      const totalLikesInPlace = await getLikesFromPlace({placeId:placeId, userId:userId})
      console.log(totalLikesInPlace)
      
      if (isEmptyArray(totalLikesInPlace)) {
          next(ApiError.badRequest('Error: No like found to delete.'))
          return
      }     
      next()
    } catch (err) {
      console.error(err)
      next(ApiError.badRequest(err))
    }
  }
  
  export { validateLikeDeletionInPlace }