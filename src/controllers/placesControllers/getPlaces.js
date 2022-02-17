import { getAllPlaces } from '../../usecases/placeUsecases/getAllPlaces.js'
import { ApiError } from '../../errors/ApiError.js'
import { isEmptyArray } from '../../utils/checkForEmptyArray.js'

const getPlaces = async (req, res, next) => {
  try {
    // const { id } = req.user

    //Validate payload equals to the user in the database they need to match.
    //Otherwise throw an error.

    // const foundUser = await getSingleUser({ _id: id })

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
