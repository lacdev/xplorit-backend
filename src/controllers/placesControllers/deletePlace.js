import { deleteSinglePlace } from '../../usecases/placeUsecases/deleteSinglePlace.js'
import { ApiError } from '../../errors/ApiError.js'

const deletePlace = async (req, res, next) => {
  try {
    const { placeId } = req.params

    // const { id } = req.user

    //Validate payload equals to the user in the database they need to match.
    //Otherwise throw an error.

    // const foundUser = await getSingleUser({ _id: id })

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
