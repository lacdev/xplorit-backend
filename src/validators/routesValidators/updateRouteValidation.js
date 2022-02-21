import { ApiError } from '../../errors/ApiError.js'
import validator from 'express-validator'
const { param, body, validationResult } = validator
import { getSingleRoute } from '../../usecases/routeUsecases/getSingleRoute.js'
import { getSingleUser } from '../../usecases/userUsecases/getSingleUser.js'
import { sanitizeInput } from '../../utils/inputSanitizer.js'

const validateRouteUpdate = async (req, res, next) => {
  try {
    const { routeId } = req.params

    const foundRoute = await getSingleRoute({ _id: routeId })

    if (!foundRoute) {
      next(ApiError.notFound('Route not found.'))
      return
    }

    const { ownerId } = foundRoute

    const { id } = req.user

    const foundUser = await getSingleUser({ _id: id })

    if (!foundUser) {
      next(ApiError.badRequest('User not found.'))
      return
    }

    const routeOwner = ownerId._id.toString()

    if (routeOwner !== id) {
      next(
        ApiError.unauthorized(
          'Only the owner is authorized to edit this route.'
        )
      )
    }

    const routeIdChain = param('routeId')
      .exists()
      .withMessage('Please provide a user ID.')
      .isMongoId()
      .withMessage('Please provide a valid ID.')
      .run(req)

    const nameChain = body('name')
      .optional()
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
      .optional()
      .exists({ checkNull: true, checkFalsy: true })
      .not()
      .isEmpty()
      .withMessage('Please provide a description for the route.')
      .isString()
      .withMessage('Name must be a string.')
      .isLength({ max: 2000 })
      .trim()
      .run(req)

    await Promise.all([routeIdChain, nameChain, descriptionChain])

    const result = validationResult(req)

    if (!result.isEmpty()) {
      next(
        ApiError.badRequest({ message: 'Bad Request', errors: result.array() })
      )
      return
    }

    const sanitizedDescription = sanitizeInput(req.body?.description)

    req.body.description = sanitizedDescription

    next()
  } catch (err) {
    console.error(err)
    next(ApiError.badRequest('No valid request to query a specific route.'))
  }
}

export { validateRouteUpdate }
