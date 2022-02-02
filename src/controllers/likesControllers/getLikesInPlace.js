import { getSinglePlace } from '../../usecases/placeUsecases/getSinglePlace.js'
import { getLikesFromPlace } from '../../usecases/likeUsecases/getLikesFromPlace.js'
import { isEmptyArray } from '../../utils/checkForEmptyArray.js'
import { ApiError } from '../../errors/ApiError.js'


const getLikesInPlace = async (req, res, next) => {
  const { placeId } = req.params

  try {
    
    const foundPlace = await getSinglePlace(placeId)
    console.log(foundPlace)
    
    if(isEmptyArray(foundPlace)) {
      next(ApiError.notFound('Place not found')) 
      return
    }
    
    const allLikesInPlace = await getLikesFromPlace(foundPlace.placeId)
      
    if(isEmptyArray(allLikesInPlace)) {
      next(ApiError.notFound('Like not found')) 
      return
    }

    res.json({
      message: 'success',
      payload: {
        data: allLikesInPlace,
        description: 'Likes found successfully',
        statusCode: 200,
      },
    })
  } catch (err) {
    console.log(err)

    next({})
  }
}

export { getLikesInPlace }
