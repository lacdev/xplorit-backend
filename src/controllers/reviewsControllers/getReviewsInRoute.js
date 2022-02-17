import { getAllReviewsFromRoute } from '../../usecases/reviewUsecases/getAllReviewsFromRoute.js'
import { ApiError } from '../../errors/ApiError.js'
import { isEmptyArray } from '../../utils/checkForEmptyArray.js'

const getReviewsInRoute = async (req, res, next) => {
  try {
    const { routeId } = req.params

    // const { id } = req.user

    //Validate payload equals to the user in the database they need to match.
    //Otherwise throw an error.

    // const foundUser = await getSingleUser({ _id: id })

    const allReviewsInRoute = await getAllReviewsFromRoute({
      routeId: routeId,
    })

    if (isEmptyArray(allReviewsInRoute.reviews)) {
      next(
        ApiError.notFound({
          message: 'No reviews for this route were found.',
          data: allReviewsInRoute.reviews,
        })
      )
      return
    }

    res.json({
      message: 'Reviews for this route found successfully',
      statusCode: 200,
      data: allReviewsInRoute,
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
      console.log(err)
      next({})
    }
  }
}

export { getReviewsInRoute }
