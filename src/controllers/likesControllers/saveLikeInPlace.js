import { getSinglePlace } from '../../usecases/placeUsecases/getSinglePlace.js'
import { getLikesFromPlace } from '../../usecases/likeUsecases/getLikesFromPlace.js'
import { isEmptyArray } from '../../utils/checkForEmptyArray.js'
import { ApiError } from '../../errors/ApiError.js'
import { postLikeToPlace } from '../../usecases/likeUsecases/postLikeToPlace.js'


const saveLikeInPlace = async (req, res, next) => {
  const { placeId } = req.params
  const { userId  } = req.body

  try {
  
    const foundPlace = await getSinglePlace(placeId)

    const getId = foundPlace.map((data) => {
      const objectId = data._id 
      return objectId })
    const idPlace = getId[0]
    const allLikesInPlace = await getLikesFromPlace(idPlace)
   
    const totalLikesInPlace = allLikesInPlace.filter((like) => like.userId == userId)
    
    if (!isEmptyArray(totalLikesInPlace)) {
      next(ApiError.badRequest('Error: user only can post 1 like for place.'))
      return
    }
    
    const savedLike = await postLikeToPlace(userId, idPlace)

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
