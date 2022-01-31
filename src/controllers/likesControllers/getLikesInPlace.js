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
    
  
    const getId = foundPlace.map((data) => {
      const objectId = data._id 
      return objectId })
    const idPlace = getId[0]

    const allLikesInPlace = await getLikesFromPlace(idPlace)
      
    const totalLikesInPlace = allLikesInPlace.length <= 0 ? 0 : allLikesInPlace.reduce((accum, current) => {
      return accum + current.like
    },0)

    if(isEmptyArray(allLikesInPlace)) {
      next(ApiError.notFound('Like not found')) 
      return
    }

    res.json({
      message: 'success',
      payload: {
        data: totalLikesInPlace,
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
