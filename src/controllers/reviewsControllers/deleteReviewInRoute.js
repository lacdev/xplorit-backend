import { deleteReviewFromRoute } from '../../usecases/reviewUsecases/deleteReviewFromRoute.js'
import { ApiError } from '../../errors/ApiError.js'

const deleteReviewInRoute = async (req, res, next) => {
  try {
    const { reviewId } = req.params

    // const { id } = req.user

    //Validate payload equals to the user in the database they need to match.
    //Otherwise throw an error.

    // const foundUser = await getSingleUser({ _id: id })

    const deletedReview = await deleteReviewFromRoute(reviewId)

    if (deletedReview) {
      res.json({
        message: 'success',
        statusCode: 204,
        data: 'Deleted review successfully',
      })
    }
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
      console.log(err)
      next({})
    }
  }
}

export { deleteReviewInRoute }
