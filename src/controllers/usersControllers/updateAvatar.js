import { updateSingleUser } from '../../usecases/userUsecases/updateSingleUser.js'

const updateAvatar = async (req, res, next) => {
  try {
    const { userId } = req.params
    const { avatar } = req.body

    const updatedUser = await updateSingleUser(userId, {
      avatar: avatar,
    })

    if (updatedUser) {
      const { avatar } = updatedUser

      res.json({
        success: true,
        statusCode: 201,
        description: 'Avatar updated successfully',
        data: avatar,
      })
    }
  } catch (err) {
    console.error(err)
    next({})
  }
}

export { updateAvatar }
