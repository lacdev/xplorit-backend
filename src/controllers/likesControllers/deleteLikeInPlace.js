import { getSinglePlace } from '../../usecases/placeUsecases/getSinglePlace.js'
import { deleteLikeFromPlace } from '../../usecases/likeUsecases/deleteLikeFromPlace.js'

const deleteLikeInPlace = async (req, res, next) => {
  try {
    const { placeId, likeId } = req.params

    if (!placeId || !likeId)
      res.json({
        message: 'Place or Like not found.',
        status: 400,
      })

    //http:www.xploritapi.com/v1/places/placeId/likes/likeId

    const foundPlace = await getSinglePlace(placeId)

    if (!foundPlace) throw new Error() //no se encontro el lugar

    // foundplace = {objeto de place encontrado en MongoDB}

    const { _id } = foundPlace

    const deletedLike = await deleteLikeFromPlace(_id, likeId)

    if (!deletedLike) throw new Error() //no se encontro el like

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
