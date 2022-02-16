import { ApiError } from '../../errors/ApiError.js'
import validator from 'express-validator'
import { getSingleRoute } from '../../usecases/routeUsecases/getSingleRoute.js'
const { param, validationResult } = validator

const validateGetRoute = async (req, res, next) => {
  try {
    const { routeId } = req.params

    // const { id } = req.user

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

    const foundRoute = await getSingleRoute(routeId)

    if (!foundRoute) {
      next(ApiError.notFound('Route not found.'))
      return
    }

    next()
  } catch (err) {
    console.error(err)
    next({})
  }
}

export { validateGetRoute }
