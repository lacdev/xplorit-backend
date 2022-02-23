import { deleteSinglePlace } from '../../usecases/placeUsecases/deleteSinglePlace.js'
import { ApiError } from '../../errors/ApiError.js'

const deletePlace = async (req, res, next) => {
  try {
    const { placeId } = req.params

    const deletedPlace = await deleteSinglePlace(placeId)

    if (deletedPlace) {
      res.json({
        message: 'success',
        statusCode: 204,
        data: 'Deleted place successfully',
      })
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

export { deletePlace }
