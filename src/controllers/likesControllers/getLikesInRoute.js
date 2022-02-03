import { getLikesFromRoute } from '../../usecases/likeUsecases/getLikesFromRoute.js'

const getLikesInRoute = async (req, res, next) => {
  const { routeId } = req.params
  try {

    const allLikesInRoute = await getLikesFromRoute({routeId: routeId})
    
    if(allLikesInRoute) {
      res.json({
        message: 'success',
        payload: {
          data: allLikesInRoute,
          description: 'Likes found successfully',
          statusCode: 200,
        },
      })
    }

  } catch (err) {
    console.log(err)

    next({})
  }
}

export { getLikesInRoute }
