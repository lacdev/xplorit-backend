import { ApiError } from '../../errors/ApiError.js'
import validator from 'express-validator'
import { getSinglePlace } from '../../usecases/placeUsecases/getSinglePlace.js'
const { param, validationResult } = validator

const validateGetReviewsFromPlace = async (req, res, next) => {
  try {
    const { placeId } = req.params

    const placeIdChain = param('placeId')
      .exists()
      .withMessage('Please provide a place ID.')
      .isMongoId()
      .withMessage('Please provide a place ID.')
      .run(req)

    await placeIdChain

    const result = validationResult(req)

    if (!result.isEmpty()) {
      next(
        ApiError.badRequest({ message: 'Bad Request', errors: result.array() })
      )
      return
    }

    const foundPlace = await getSinglePlace({ _id: placeId })

    if (!foundPlace) {
      next(ApiError.notFound('Place not found.'))
      return
    }

    next()
  } catch (err) {
    console.error(err)

    next(
      ApiError.badRequest('No valid request to query a specific place reviews.')
    )
  }
}

export { validateGetReviewsFromPlace }
