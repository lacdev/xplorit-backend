import { getPlacesCreatedByUser } from '../../usecases/userUsecases/getPlacesCreatedByUser.js'
import { ApiError } from '../../errors/ApiError.js'
import { isEmptyArray } from '../../utils/checkForEmptyArray.js'

const getPlacesByUser = async (req, res, next) => {
  // const { userId } = req.params

  //Validate payload equals to the user in the database they need to match.
  //Otherwise throw an error.

  // const foundUser = await getSingleUser({ _id: id })

  try {
    const { id } = req.user

    const placesByUser = await getPlacesCreatedByUser(id)

    if (isEmptyArray(placesByUser)) {
      next(ApiError.notFound('No places created by this user were found.'))
      return
    }

    res.json({
      message: 'success',
      statusCode: 200,
      data: placesByUser,
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

export { getPlacesByUser }
