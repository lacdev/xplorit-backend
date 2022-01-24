import { getSingleRoute } from '../../usecases/routeUsecases/getSingleRoute.js'
import { updateReviewFromRoute } from '../../usecases/reviewUsecases/updateReviewFromRoute.js'
import { ApiError } from '../../errors/ApiError.js'

const updateReviewInRoute = async (req, res) => {
  const { routeId } = req.params
  const { updatedContent } = req.body
  try {
    const foundRoute = await getSingleRoute(routeId)

    const updatedReview = await updateReviewFromRoute(
      foundRoute._id,
      updatedContent
    )

    res.json({
      message: 'success',
      payload: {
        data: updatedReview,
        description: 'Updated review successfully',
        statusCode: 200,
      },
    })
  } catch (err) {
    console.error(err)
    res.json({
      message: 'failure',
      error: {
        err,
        description: 'Route not found.',
        statusCode: 404,
      },
    })
  }
}

export { updateReviewInRoute }
