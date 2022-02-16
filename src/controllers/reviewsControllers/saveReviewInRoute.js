import { postReviewToRoute } from '../../usecases/reviewUsecases/postReviewToRoute.js'
import { ApiError } from '../../errors/ApiError.js'

const saveReviewInRoute = async (req, res, next) => {
  try {
    const { routeId } = req.params
    const newReview = req.body

    // const { id } = req.user

    //Validate payload equals to the user in the database they need to match.
    //Otherwise throw an error.

    // const foundUser = await getSingleUser({ _id: id })

    newReview.routeId = routeId

    const savedReview = await postReviewToRoute(newReview)

    if (savedReview) {
      res.json({
        description: 'Review created in the route successfully',
        statusCode: 200,
        data: savedReview,
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

export { saveReviewInRoute }
