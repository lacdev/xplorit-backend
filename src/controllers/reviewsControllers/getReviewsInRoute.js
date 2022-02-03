import { getAllReviewsFromRoute } from '../../usecases/reviewUsecases/getAllReviewsFromRoute.js'

const getReviewsInRoute = async (req, res, next) => {
  const { routeId } = req.params

  try {
    const allReviewsInRoute = await getAllReviewsFromRoute({ routeId: routeId })

    res.json({
      message: 'Reviews for this route found successfully',
      statusCode: 200,
      data: allReviewsInRoute,
    })
  } catch (err) {
    console.log(err)

    next({})
  }
}

export { getReviewsInRoute }
