import { postReviewToRoute } from '../../usecases/reviewUsecases/postReviewToRoute.js'

const saveReviewInRoute = async (req, res, next) => {
  const { routeId } = req.params
  const newReview = req.body

  try {
    newReview.routeId = routeId

    const savedReview = await postReviewToRoute(newReview)

    if (savedReview) {
      res.json({
        description: 'Review created in the route successfully',
        statusCode: 200,
      })
    }
  } catch (err) {
    console.error(err)
    next({})
  }
}

export { saveReviewInRoute }
