import { postLikeToPlace } from '../../usecases/likeUsecases/postLikeToPlace.js'
import mongoose from 'mongoose'
import { getLikesFromPlace } from '../../usecases/likeUsecases/getLikesFromPlace.js'
import { isEmptyArray } from '../../utils/checkForEmptyArray.js'
import { ApiError } from '../../errors/ApiError.js'



const saveLikeInPlace = async (req, res, next) => {
  const { placeId } = req.params
  const { userId } = req.body
  
  //Convert to  new ObjectId
  const newPlaceId = mongoose.Types.ObjectId(placeId);
  const newUserId = mongoose.Types.ObjectId(userId);
  

  try {

    const allLikesInPlace = await getLikesFromPlace(newPlaceId)
    console.log("totalikesinPlace: " + allLikesInPlace)
    

    const totalLikesInPlace = allLikesInPlace.filter((like) =>{ 
      console.log("data1: ",like.userId)
      console.log("data2: ",userId)
      (like.userId) === userId})
    console.log("totalLikesinPlace: " + totalLikesInPlace)  
    
    if (!isEmptyArray(totalLikesInPlace)) {
        next(ApiError.badRequest('Error: user only can post 1 like for place.'))
        return
    }
  

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
