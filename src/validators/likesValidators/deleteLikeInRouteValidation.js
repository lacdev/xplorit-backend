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
    const { userId } = req.body

    // const { id } = req.user

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

    const result = validationResult(req)

    if (!result.isEmpty()) {
      next(
        ApiError.badRequest({ message: 'Bad Request', errors: result.array() })
      )
      return
    }

    // const foundUser = await getSingleUser({ _id: id })

    const routeExists = await getSingleRoute({ _id: routeId })

    if (!routeExists) {
      next(ApiError.badRequest('Route not found.'))
      return
    }

    const userExists = await getSingleUser({
      _id: userId,
    })

    // const userExists = await getSingleUser(userId)

    if (!userExists) {
      next(ApiError.badRequest('User not found.'))
      return
    }

    const totalLikesInRoute = await getLikesFromRoute({
      routeId: routeId,
      userId: userId,
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
