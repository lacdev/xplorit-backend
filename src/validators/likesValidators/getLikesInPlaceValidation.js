import { ApiError } from '../../errors/ApiError.js'
import validator from 'express-validator'
// import { isEmptyArray } from '../../utils/checkForEmptyArray.js'
import { getSinglePlace } from '../../usecases/placeUsecases/getSinglePlace.js'

const { param, validationResult } = validator

const getLikesFromPlaceValidation = async (req, res, next) => {
  try {
    const { placeId } = req.params

    // const { id } = req.user

    //Validate payload equals to the user in the database they need to match.
    //Otherwise throw an error.

    // const foundUser = await getSingleUser({ _id: id })

    const placeIdChain = param('placeId')
      .exists()
      .withMessage('Please provide a place ID.')
      .isMongoId()
      .withMessage('Please provide a valid place ID.')
      .run(req)

    await placeIdChain

    const result = validationResult(req)

    if (!result.isEmpty()) {
      next(
        ApiError.badRequest({ message: 'Bad Request', errors: result.array() })
      )
      return
    }

    // const foundUser = await getSingleUser({ _id: id })

    const placeExists = await getSinglePlace({ _id: placeId })

    if (!placeExists) {
      next(ApiError.badRequest('Place not found.'))
      return
    }

    next()
  } catch (err) {
    console.error(err)
    next(ApiError.badRequest(err))
  }
}

export { getLikesFromPlaceValidation }
