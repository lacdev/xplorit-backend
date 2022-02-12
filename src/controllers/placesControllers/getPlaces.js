import { getAllPlaces } from '../../usecases/placeUsecases/getAllPlaces.js'
import { ApiError } from '../../errors/ApiError.js'
import { isEmptyArray } from '../../utils/checkForEmptyArray.js'

const getPlaces = async (req, res, next) => {
  try {
    // let page = parseInt(req.query.page) || 1
    // let limit = parseInt(req.query.limit) || 9

    //filters object pending
    //Example getAllPlaces({filters}, {query})

    const allPlaces = await getAllPlaces(req.query)

    if (isEmptyArray(allPlaces)) {
      next(ApiError.notFound('No places were found.'))
      return
    }

    res.json({
      message: 'success',
      statusCode: 200,
      description: 'Places found successfully',
      data: allPlaces,
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
      next({})
    }
  }
}

export { getPlaces }
