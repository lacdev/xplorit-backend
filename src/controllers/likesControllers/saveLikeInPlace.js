import { postLikeToPlace } from '../../usecases/likeUsecases/postLikeToPlace.js'
import mongoose from 'mongoose'

const saveLikeInPlace = async (req, res, next) => {
  const { placeId } = req.params
  const { userId } = req.body
  
  //Convert to  new ObjectId
  const newPlaceId = mongoose.Types.ObjectId(placeId);
  const newUserId = mongoose.Types.ObjectId(userId);
  
  try {
    const savedLike = await postLikeToPlace(newPlaceId, newUserId)

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

export { saveLikeInPlace }
