import { updateSingleUser } from '../../usecases/userUsecases/updateSingleUser.js'
import { hashPassword } from '../../lib/bcrypt.js'

const updatePassword = async (req, res, next) => {
  try {
    const { userId } = req.params
    const { password } = req.body

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
    console.error(err)
    next({})
  }
}

export { updatePassword }
