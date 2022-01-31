import { ApiError } from '../../errors/ApiError.js'
import validator from 'express-validator'
const { param, body, validationResult } = validator
import { isEmptyArray } from '../../utils/checkForEmptyArray.js'
import { getSingleRoute } from '../../usecases/routeUsecases/getSingleRoute.js'

const validateRouteUpdate = async (req, res, next) => {
  try {
    const { routeId } = req.params

    const routeIdChain = param('routeId')
      .exists()
      .withMessage('Please provide a user ID.')
      .isMongoId()
      .withMessage('Please provide a valid ID.')
      .run(req)

    const nameChain = body('name')
      .exists({ checkNull: true, checkFalsy: true })
      .not()
      .isEmpty()
      .withMessage('Please provide a name for the route.')
      .isString()
      .withMessage('Name must be a string.')
      .isLength({ max: 300 })
      .trim()
      .escape()
      .run(req)

    const descriptionChain = body('description')
      .exists({ checkNull: true, checkFalsy: true })
      .not()
      .isEmpty()
      .withMessage('Please provide a description for the route.')
      .isString()
      .withMessage('Name must be a string.')
      .isLength({ max: 2000 })
      .trim()
      .escape()
      .run(req)

    // const imagesChain = body('images')
    //   .exists({ checkNull: true, checkFalsy: true })
    //   .isArray()
    //   .withMessage('Images must be an array.')
    //   .run(req)

    await Promise.all([routeIdChain, nameChain, descriptionChain])

    const result = validationResult(req)

    if (!result.isEmpty()) {
      next(
        ApiError.badRequest({ message: 'Bad Request', errors: result.array() })
      )
      return
    }

    const routeExists = await getSingleRoute({ _id: routeId })

    if (isEmptyArray(routeExists)) {
      next(ApiError.badRequest('Route not found.'))
      return
    }
    next()
  } catch (err) {
    console.error(err)

    next(ApiError.badRequest('No valid request to query a specific route.'))
  }
}

export { validateRouteUpdate }
