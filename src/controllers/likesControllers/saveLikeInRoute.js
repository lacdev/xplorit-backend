import { postLikeToRoute } from '../../usecases/likeUsecases/postLikeToRoute.js'

const saveLikeInRoute = async (req, res, next) => {
  const { routeId} = req.params
  const { userId } = req.body
  
  try {
    const savedLike = await postLikeToRoute({routeId:routeId, userId:userId})

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
    next({})
  } 
}

export { saveLikeInRoute }
