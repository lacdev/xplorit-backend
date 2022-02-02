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
 
    const allLikesInPlace = await getLikesFromPlace(foundPlace.placeId)

    const totalLikesInPlace = allLikesInPlace.filter((like) => like.userId == userId)  
    if (!isEmptyArray(totalLikesInPlace)) {
        next(ApiError.badRequest('Error: user only can post 1 like for place.'))
        return
    }
    const savedLike = await postLikeToPlace(userId, foundPlace.placeId)

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
