import { getSingleRoute } from '../../usecases/routeUsecases/getSingleRoute.js'
import { getAllReviewsFromRoute } from '../../usecases/reviewUsecases/getAllReviewsFromRoute.js'

const getReviewsInRoute = async (req, res) => {
  const { routeId } = req.params

  try {
    const foundRoute = await getSingleRoute(routeId)

    const allReviewsInRoute = await getAllReviewsFromRoute(foundRoute._id)

    res.json({
      message: 'success',
      payload: {
        data: allReviewsInRoute,
        description: 'Reviews found successfully',
        statusCode: 200,
      },
    })
  } catch (err) {
    console.log(err)

    res.json({
      message: 'failure',
      error: {
        err,
        description: 'Could not get reviews.',
        statusCode: 404,
      },
    })
  }
}

export { getReviewsInRoute }
