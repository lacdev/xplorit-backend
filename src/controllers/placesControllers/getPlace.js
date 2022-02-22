import { getSinglePlace } from '../../usecases/placeUsecases/getSinglePlace.js'
import { ApiError } from '../../errors/ApiError.js'

const getPlace = async (req, res, next) => {
  try {
    const { placeId } = req.params

    const singlePlace = await getSinglePlace({ _id: placeId })

    if (!singlePlace) {
      next(ApiError.notFound('No single place with this ID was found.'))
      return
    }

    res.json({
      message: 'success',
      description: 'Place found',
      statusCode: 200,
      data: singlePlace,
    })
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

export { getPlace }
