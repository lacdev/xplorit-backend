import { getSinglePlace } from '../../usecases/placeUsecases/getSinglePlace.js'
import { deleteLikeFromPlace } from '../../usecases/likeUsecases/deleteLikeFromPlace.js'
import { getLikesFromPlace } from '../../usecases/likeUsecases/getLikesFromPlace.js'
import { isEmptyArray } from '../../utils/checkForEmptyArray.js'
import { ApiError } from '../../errors/ApiError.js'


const deleteLikeInPlace = async (req, res, next) => {
  const { placeId } = req.params
  const { likeId  } = req.params
  try {
    const foundPlace = await getSinglePlace(placeId)
    
    if(isEmptyArray(foundPlace)) {
      next(ApiError.notFound('Place not found')) 
      return
    }

    const getId = foundPlace.map((data) => {
      const objectId = data._id 
      return objectId })
    const idPlace = getId[0]

    const allLikesInPlace = await getLikesFromPlace(idPlace)
    console.log("data: " + allLikesInPlace)
      
    const totalLikesInPlace = allLikesInPlace.filter((like) => like._id == likeId)
    console.log("data2: " + totalLikesInPlace)

    if (isEmptyArray(totalLikesInPlace)) {
      next(ApiError.badRequest('Error: No like found to delete.'))
      return
    }
    const deletedLike = await deleteLikeFromPlace(likeId)


    if (deletedLike) {
      res.json({
        message: 'success',
        payload: {
          data: 'No content',
          description: 'Deleted like successfully',
          statusCode: 204,
        },
      })
    }
  } catch (err) {
    console.error(err)
    next({})
  }
}

export { deleteLikeInPlace }