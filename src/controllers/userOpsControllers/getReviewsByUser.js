import { getReviewsMadeByUser } from '../../usecases/userUsecases/getReviewsMadeByUser.js'
import { ApiError } from '../../errors/ApiError.js'
import { isEmptyArray } from '../../utils/checkForEmptyArray.js'

const getReviewsByUser = async (req, res, next) => {
  const { userId } = req.params

  try {
    const reviewsByUser = await getReviewsMadeByUser(userId)

    if (isEmptyArray(reviewsByUser)) {
      next(ApiError.notFound('No reviews created by this user were found.'))
      return
    }

    res.json({
      message: 'success',
      statusCode: 200,
      data: reviewsByUser,
    })
  } catch (err) {
    if (err.name === 'ValidationError') {
      next(
        ApiError.badRequest({
          message: 'Validation Error',
          errors: err,
        })
      )
      return
    } else {
      next({})
    }
  }
}

export { getReviewsByUser }
