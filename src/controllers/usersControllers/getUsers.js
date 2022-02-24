import { getAllUsers } from '../../usecases/userUsecases/getAllUsers.js'
import { ApiError } from '../../errors/ApiError.js'
import { isEmptyArray } from '../../utils/checkForEmptyArray.js'

const getUsers = async (req, res, next) => {
  try {
    const allUsers = await getAllUsers({})

    if (isEmptyArray(allUsers)) {
      next(ApiError.notFound('No users were found.'))
    }

    res.json({
      message: 'success',
      statusCode: 200,
      data: allUsers,
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

export { getUsers }
