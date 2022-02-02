import { ApiError } from '../../errors/ApiError.js'
import validator from 'express-validator'
import { isEmptyArray } from '../../utils/checkForEmptyArray.js'

const { body, validationResult } = validator

const ValidateLikeInPlace = async (req, res, next) => {
    try {
        const { placeId } = req.params
        const { userId } = req.body
        console.log("aaa:", userId)
  
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
      console.log("placeExists: " + placeExists)

      if (isEmptyArray(placeExists)) {
        next(ApiError.badRequest('Place not found.'))
        return
      }
      
      //Unique like exists validation
      const totalLikesInPlace = placeExists.filter((like) =>{(like.userId) === userId})
      
      if (!isEmptyArray(totalLikesInPlace)) {
          next(ApiError.badRequest('Error: user only can post 1 like for place.'))
          return
      }

      //userId exists validation
      const userExists = await getSingleUser(userId)
      if (isEmptyArray(userExists)) {
        next(ApiError.badRequest('User not found.'))
        return
      }

      next()
    } catch (err) {
      console.error(err)
      next(ApiError.badRequest(err))
    }
  }
  
  export { ValidateLikeInPlace }