import { updateSingleUser } from '../../usecases/userUsecases/updateSingleUser.js'

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
    console.error(err)
    next({})
  }
}

export { updateUsername }
