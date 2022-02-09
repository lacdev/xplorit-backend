import { deleteSingleUser } from '../../usecases/userUsecases/deleteSingleUser.js'
import { ApiError } from '../../errors/ApiError.js'

const deleteUser = async (req, res, next) => {
  try {
    const { userId } = req.params

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
      next({})
    }
  }
}

export { deleteUser }
