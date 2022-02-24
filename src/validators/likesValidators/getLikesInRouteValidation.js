import { ApiError } from '../../errors/ApiError.js'
import validator from 'express-validator'
import { getSingleRoute } from '../../usecases/routeUsecases/getSingleRoute.js'

const { param, validationResult } = validator

const getLikesFromRouteValidation = async (req, res, next) => {
  try {
    const { routeId } = req.params

    const routeIdChain = param('routeId')
      .exists()
      .withMessage('Please provide a route ID.')
      .isMongoId()
      .withMessage('Please provide a valid route ID.')
      .run(req)

    await routeIdChain

    const result = validationResult(req)

    if (!result.isEmpty()) {
      next(
        ApiError.badRequest({ message: 'Bad Request', errors: result.array() })
      )
      return
    }

    const routeExists = await getSingleRoute({ _id: routeId })

    if (!routeExists) {
      next(ApiError.badRequest('Route not found.'))
      return
    }

    next()
  } catch (err) {
    console.error(err)
    next(ApiError.badRequest(err))
  }
}

export { getLikesFromRouteValidation }
