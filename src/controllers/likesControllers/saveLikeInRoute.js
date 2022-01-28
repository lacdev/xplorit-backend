import { getSingleRoute } from '../../usecases/routeUsecases/getSingleRoute.js'
import { postLikeToRoute } from '../../usecases/likeUsecases/postLikeToRoute.js'

const saveLikeInRoute = async (req, res, next) => {
  const { routeId } = req.params
  const { newLike } = req.body

  try {
    const foundRoute = await getSingleRoute(routeId)

    const savedLike = await postLikeToRoute(foundRoute._id, newLike)

    if (savedLike) {
      res.json({
        message: 'success',
        statusCode: 200,
        description: 'Liked route successfully',
      })
    }
  } catch (err) {
    console.error(err)
    next({})
  }
}

export { saveLikeInRoute }
