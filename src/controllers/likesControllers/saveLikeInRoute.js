import { getSingleRoute } from '../../usecases/routeUsecases/getSingleRoute.js'
import { postLikeToRoute } from '../../usecases/likeUsecases/postLikeToRoute.js'

const saveLikeInRoute = async (req, res) => {
  const { routeId } = req.params
  const { newLike } = req.body

  try {
    const foundRoute = await getSingleRoute(routeId)

    const savedLike = await postLikeToRoute(foundRoute._id, newLike)

    res.json({
      message: 'success',
      payload: {
        data: savedLike,
        description: 'Like created successfully',
        statusCode: 200,
      },
    })
  } catch (err) {
    console.error(err)
    res.json({
      message: 'failure',
      error: {
        err,
        description: 'Could not save like.',
        statusCode: 400,
      },
    })
  }
}

export { saveLikeInRoute }
