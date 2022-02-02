import { ApiError } from '../../errors/ApiError.js'
import validator from 'express-validator'
import { isEmptyArray } from '../../utils/checkForEmptyArray.js'
import { getSinglePlace } from '../../usecases/PlaceUsecases/getSinglePlace.js'
import { getLikesFromPlace } from 'usecases/likeUsecases/getLikesFromPlace.js'


const { body, validationResult } = validator

const validatePlaceRetrieve = async (req, res, next) => {
    try {
        const { placeId } = req.params
       
  
      //Sanitization and validator chains on user registration requested information from body.
  
      const placeIdChain = param('placeId')
      .exists()
      .withMessage('Please provide a place ID.')
      .isMongoId()
      .withMessage('Please provide a valid place ID.')
      .run(req)

      

      await Promise.all([placeIdChain])

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

      const allLikesInPlace = await getLikesFromPlace(foundPlace.placeId)
      
      if(isEmptyArray(allLikesInPlace)) {
        next(ApiError.notFound('Like not found')) 
        return
      }
      
      next()
    } catch (err) {
      console.error(err)
      next(ApiError.badRequest(err))
    }
  }
  
  export { validatePlaceRetrieve }