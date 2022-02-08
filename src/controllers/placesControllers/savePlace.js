import { ApiError } from '../../errors/ApiError.js'
import { createSinglePlace } from '../../usecases/placeUsecases/createSinglePlace.js'

const savePlace = async (req, res, next) => {
  try {
    const newPlace = req.body

    const savedPlace = await createSinglePlace(newPlace)

    if (!savedPlace) {
      next(
        ApiError.internalError(
          'Something bad happened while uploading the place.'
        )
      )
    }

    res.json({
      message: 'success',
      statusCode: 200,
      description: 'Place created successfully',
    })
  } catch (err) {
    console.error(err)
    next({})
  }
}

export { savePlace }
