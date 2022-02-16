import { updateSingleUser } from '../../usecases/userUsecases/updateSingleUser.js'
import { hashPassword } from '../../lib/bcrypt.js'
import { ApiError } from '../../errors/ApiError.js'

const updatePassword = async (req, res, next) => {
  try {
    const { userId } = req.params
    const { password } = req.body

    // const { id } = req.user

    //Validate payload equals to the user in the database they need to match.
    //Otherwise throw an error.

    // const foundUser = await getSingleUser({ _id: id })

    const hashedPass = await hashPassword(password)

    const updatedUser = await updateSingleUser(userId, {
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
