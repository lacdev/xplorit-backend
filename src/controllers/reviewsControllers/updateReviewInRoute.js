import { getSingleRoute } from '../../usecases/routeUsecases/getSingleRoute.js'
import { updateReviewFromRoute } from '../../usecases/reviewUsecases/updateReviewFromRoute.js'

const updateReviewInRoute = async (req, res, next) => {
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
    next({})
  }
}

export { updateReviewInRoute }
