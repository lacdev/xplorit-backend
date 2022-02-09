import { ApiError } from '../../errors/ApiError.js'
import { createSinglePlace } from '../../usecases/placeUsecases/createSinglePlace.js'

const savePlace = async (req, res, next) => {
  try {
    const newPlace = req.body

    const savedPlace = await createSinglePlace(newPlace)

    if (savedPlace) {
      res.json({
        message: 'success',
        statusCode: 200,
        description: 'Place created successfully',
        data: savedPlace,
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

export { savePlace }
