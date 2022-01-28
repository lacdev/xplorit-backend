import { getSingleUser } from '../../usecases/userUsecases/getSingleUser.js'
import { deleteSingleUser } from '../../usecases/userUsecases/deleteSingleUser.js'
import { ApiError } from '../../errors/ApiError.js'
import { isEmptyObject } from '../../utils/checkForEmpyObject.js'

const deleteUser = async (req, res, next) => {
  try {
    const { userId } = req.params

    const foundUser = await getSingleUser(userId)

    if (isEmptyObject(foundUser)) {
      next(ApiError.notFound('User not found.'))
      return
    }

    const deletedUser = await deleteSingleUser(userId)

    if (deletedUser) {
      res.json({
        message: 'success',
        payload: {
          data: 'No content',
          description: 'Deleted user successfully',
          statusCode: 204,
        },
      })
    }
  } catch (err) {
    console.error(err)
    next({})
  }
}

export { deleteUser }
