import { ApiError } from '../../errors/ApiError.js'
import validator from 'express-validator'
import { isEmptyArray } from '../../utils/checkForEmptyArray.js'
import { getLikesFromRoute } from '../../usecases/likeUsecases/getLikesFromRoute.js'
import { getSingleRoute } from '../../usecases/routeUsecases/getSingleRoute.js'
import { getSingleUser } from '../../usecases/userUsecases/getSingleUser.js'

const { body, param, validationResult } = validator

const validateLikeDeletionInRoute = async (req, res, next) => {
    try {
        const { routeId } = req.params
        const { userId  } = req.body
  
      //Sanitization and validator chains on user registration requested information from body.
  
      const routeIdChain = param('routeId')
      .exists()
      .withMessage('Please provide a route ID.')
      .isMongoId()
      .withMessage('Please provide a valid route ID.')
      .run(req)

      const userIdChain = body('userId')
      .exists()
      .withMessage('Please provide a user ID.')
      .isMongoId()
      .withMessage('Please provide a valid user ID.')
      .run(req)

      await Promise.all([routeIdChain, userIdChain])

      //Validation on request results
      const result = validationResult(req)
  
      if (!result.isEmpty()) {
        next(
          ApiError.badRequest({ message: 'Bad Request', errors: result.array() })
        )
        return
      }

      //route exists validation
      const routeExists = await getSingleRoute({ _id: routeId })

      if (isEmptyArray(routeExists)) {
        next(ApiError.badRequest('route not found.'))
        return
      }

       //userId exists validation
       const userExists = await getSingleUser(userId)

       if (isEmptyArray(userExists)) {
         next(ApiError.badRequest('User not found.'))
         return
       }
      
      // like exists validation
      const totalLikesInRoute = await getLikesFromRoute({routeId:routeId, userId:userId})
      
      if (isEmptyArray(totalLikesInRoute)) {
          next(ApiError.badRequest('Error: No like found to delete.'))
          return
      }     
      next()
    } catch (err) {
      console.error(err)
      next(ApiError.badRequest(err))
    }
  }
  
  export { validateLikeDeletionInRoute }