import { updateSingleUser } from '../../usecases/userUsecases/updateSingleUser.js'
import { ApiError } from '../../errors/ApiError.js'

const updateUsername = async (req, res, next) => {
  try {
    const { userId } = req.params
    const { username } = req.body

    const updatedUser = await updateSingleUser(userId, {
      username,
    })

    if (updatedUser) {
      const { username } = updatedUser
      res.json({
        success: true,
        statusCode: 201,
        description: 'Username updated successfully',
        data: username,
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

export { updateUsername }
