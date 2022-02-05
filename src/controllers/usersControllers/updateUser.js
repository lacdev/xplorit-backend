import { updateSingleUser } from '../../usecases/userUsecases/updateSingleUser.js'
import { hashPassword } from '../../lib/bcrypt.js'

const updateUser = async (req, res, next) => {
  try {
    const { userId } = req.params
    const { avatar, coverPhoto, password } = req.body

    const hashedPass = await hashPassword(password)

    const updatedUser = await updateSingleUser(userId, {
      avatar,
      coverPhoto,
      password: hashedPass,
    })

    if (updatedUser) {
      res.json({
        success: true,
        statusCode: 201,
        description: 'User updated successfully',
      })
    }
  } catch (err) {
    console.error(err)
    next({})
  }
}

export { updateUser }
