import { getSingleRoute } from '../../usecases/routeUsecases/getSingleRoute.js'
import { getLikesFromRoute} from '../../usecases/likeUsecases/getLikesFromRoute.js'

const getLikesInRoute = async (req, res, next) => {
  const { routeId } = req.params

  try {
    
    const foundRoute = await getSingleRoute(routeId)

    const id = foundRoute.routeId
    const allLikesInRoute = await getLikesFromRoute(foundRoute.routeId)
    console.log(allLikesInRoute)

    res.json({
      message: 'success',
      payload: {
        data: allLikesInRoute,
        description: 'Likes found successfully',
        statusCode: 200,
      },
    })
  } catch (err) {
    console.log(err)

    next({})
  }
}

export { getLikesInRoute }
