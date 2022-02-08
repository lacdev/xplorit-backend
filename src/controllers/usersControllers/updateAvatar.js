import { updateSingleUser } from '../../usecases/userUsecases/updateSingleUser.js'

const updateAvatar = async (req, res, next) => {
  try {
    const { userId } = req.params
    const { avatar } = req.body

    const updatedUser = await updateSingleUser(userId, {
      avatar: avatar,
    })

    if (updatedUser) {
      res.json({
        success: true,
        description: 'Avatar updated successfully',
        statusCode: 201,
      })
    }
  } catch (err) {
    console.error(err)
    next({})
  }
}

export { updateAvatar }
