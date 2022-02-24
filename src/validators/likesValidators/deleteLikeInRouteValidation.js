import { ApiError } from '../../errors/ApiError.js'
import validator from 'express-validator'
import { isEmptyArray } from '../../utils/checkForEmptyArray.js'
import { getLikesFromRoute } from '../../usecases/likeUsecases/getLikesFromRoute.js'
import { getSingleRoute } from '../../usecases/routeUsecases/getSingleRoute.js'
import { getSingleUser } from '../../usecases/userUsecases/getSingleUser.js'

const { param, validationResult } = validator

const validateLikeDeletionInRoute = async (req, res, next) => {
  try {
    const { routeId } = req.params

    const { id } = req.user

    const foundUser = await getSingleUser({ _id: id })

    if (!foundUser) {
      next(ApiError.badRequest('User not found.'))
      return
    }

    const routeIdChain = param('routeId')
      .exists()
      .withMessage('Please provide a route ID.')
      .isMongoId()
      .withMessage('Please provide a valid route ID.')
      .run(req)

    await Promise.all([routeIdChain])

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

    const totalLikesInRoute = await getLikesFromRoute({
      routeId: routeId,
      userId: id,
    })

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
