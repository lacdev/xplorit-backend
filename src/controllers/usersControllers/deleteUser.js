import { deleteSingleUser } from '../../usecases/userUsecases/deleteSingleUser.js'
import { ApiError } from '../../errors/ApiError.js'

const deleteUser = async (req, res, next) => {
  try {
    const { userId } = req.params

    // const { id } = req.user

    //Validate payload equals to the user in the database they need to match.
    //Otherwise throw an error.

    // const foundUser = await getSingleUser({ _id: id })

    const deletedUser = await deleteSingleUser(userId)

    if (deletedUser) {
      res.json({
        message: 'success',
        data: 'Deleted user successfully',
        statusCode: 204,
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

export { deleteUser }
