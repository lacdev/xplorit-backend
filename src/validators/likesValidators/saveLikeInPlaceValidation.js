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

      
      const result = validationResult(req)
  
      if (!result.isEmpty()) {
        next(
          ApiError.badRequest({ message: 'Bad Request', errors: result.array() })
        )
        return
      }
  
      const placeExists = await getSinglePlace({ _id: placeId })
      console.log("placeExists: " + placeExists)

      if (isEmptyArray(placeExists)) {
        next(ApiError.badRequest('Place not found.'))
        return
      }

      const userExists = await getSingleUser(userId)
      console.log("user: ", userExists)

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