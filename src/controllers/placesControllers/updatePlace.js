import { updateSinglePlace } from '../../usecases/placeUsecases/updateSinglePlace.js'
import { ApiError } from '../../errors/ApiError.js'

const updatePlace = async (req, res, next) => {
  try {
    const { placeId } = req.params
    const body = req.body

    const updatedPlace = await updateSinglePlace(placeId, body)

    if (updatedPlace) {
      res.json({
        message: 'success',
        statusCode: 200,
        description: 'Place updated successfully',
        data: updatedPlace,
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
      next({})
    }
  }
}

export { updatePlace }
