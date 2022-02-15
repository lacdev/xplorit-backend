import { getAllPlaces } from '../../usecases/placeUsecases/getAllPlaces.js'
import { ApiError } from '../../errors/ApiError.js'
import { isEmptyArray } from '../../utils/checkForEmptyArray.js'

const getPlaces = async (req, res, next) => {
  try {
    const allPlaces = await getAllPlaces(req.query)

    // console.log('All places is returning what? ', allPlaces.places)

    if (isEmptyArray(allPlaces.places)) {
      next(
        ApiError.notFound({
          message: 'No places were found.',
          data: allPlaces.places,
        })
      )
      return
    }

    res.json({
      message: 'success',
      statusCode: 200,
      description: 'Places found successfully',
      data: allPlaces,
    })
  } catch (err) {
    if (err.name === 'MongoServerError') {
      next(
        ApiError.badRequest({
          message: 'Error',
          errors: err.message,
        })
      )
      return
    } else {
      console.log(err)
      next({})
    }
  }
}

export { getPlaces }
