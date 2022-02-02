
import { postLikeToRoute } from '../../usecases/likeUsecases/postLikeToRoute.js'
import mongoose from 'mongoose'

const saveLikeInRoute = async (req, res, next) => {
  const { routeId } = req.params
  const { userId } = req.body
  
  //Convert to  new ObjectId
  const newRouteId = mongoose.Types.ObjectId(routeId);
  const newUserId = mongoose.Types.ObjectId(userId);

  try {

    const savedLike = await postLikeToRoute(newRouteId, newUserId)

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
