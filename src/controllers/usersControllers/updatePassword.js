import { updateSingleUser } from '../../usecases/userUsecases/updateSingleUser.js'
import { hashPassword } from '../../lib/bcrypt.js'
import { ApiError } from '../../errors/ApiError.js'

const updatePassword = async (req, res, next) => {
  try {
    const { password } = req.body

    const { id } = req.user

    const hashedPass = await hashPassword(password)

    const updatedUser = await updateSingleUser(id, {
      password: hashedPass,
    })

    if (updatedUser) {
      res.json({
        success: true,
        statusCode: 201,
        description: 'User password updated successfully',
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

export { updatePassword }
