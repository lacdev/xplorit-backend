import { getSingleRoute } from '../../usecases/routeUsecases/getSingleRoute.js'
import { postReviewToRoute } from '../../usecases/reviewUsecases/postReviewToRoute.js'

const saveReviewInRoute = async (req, res) => {
  const { routeId } = req.params
  const { newReview } = req.body

  try {
    const foundRoute = await getSingleRoute(routeId)

    const savedReview = await postReviewToRoute(foundRoute._id, newReview)

    res.json({
      message: 'success',
      payload: {
        data: savedReview,
        description: 'Review created successfully',
        statusCode: 200,
      },
    })
  } catch (err) {
    console.error(err)
    res.json({
      message: 'failure',
      error: {
        err,
        description: 'Could not save review.',
        statusCode: 400,
      },
    })
  }
}

export { saveReviewInRoute }
