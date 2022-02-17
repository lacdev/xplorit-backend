import { deleteLikeFromPlace } from '../../usecases/likeUsecases/deleteLikeFromPlace.js'
import { updateSinglePlace } from '../../usecases/placeUsecases/updateSinglePlace.js'
import { ApiError } from '../../errors/ApiError.js'

const deleteLikeInPlace = async (req, res, next) => {
  try {
    const { placeId } = req.params
    const { userId } = req.body

    // const { id } = req.user

    //Validate payload equals to the user in the database they need to match.
    //Otherwise throw an error.

    // const foundUser = await getSingleUser({ _id: id })

    const deletedLike = await deleteLikeFromPlace({
      placeId: placeId,
      userId: userId,
    })

    if (deletedLike) {
      const updatedPlace = await updateSinglePlace(placeId, {
        $inc: { likes: -1 },
      })

      if (updatedPlace) {
        res.json({
          message: 'success',
          statusCode: 204,
          data: 'Deleted like in place successfully',
        })
      }
    }
  } catch (err) {
    if (err.name === 'ValidationError') {
      next(
        ApiError.badRequest({
          message: 'Validation Error',
          errors: err,
        })
      )
      return
    } else {
      console.log(err)
      next({})
    }
  }
}

export { deleteLikeInPlace }
