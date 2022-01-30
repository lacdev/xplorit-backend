import { getSinglePlace } from '../../usecases/placeUsecases/getSinglePlace.js'
import { deleteLikeFromPlace } from '../../usecases/likeUsecases/deleteLikeFromPlace.js'

const deleteLikeInPlace = async (req, res, next) => {
  const { placeId } = req.params
  const { likeId  } = req.params
  try {
    
    console.log("placeId: " +placeId)
    const foundPlace = await getSinglePlace(placeId)
    console.log("foundPlace: " +foundPlace)

    const getId = foundPlace.map((data) => {
      const objectId = data._id 
      return objectId })
    const idPlace = getId[0] 

    //const allLikesInPlace = await getLikesFromPlace(idPlace)


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