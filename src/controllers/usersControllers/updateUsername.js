import { updateSingleUser } from '../../usecases/userUsecases/updateSingleUser.js'

const updateUsername = async (req, res, next) => {
  try {
    const { userId } = req.params
    const { username } = req.body

    const updatedUser = await updateSingleUser(userId, {
      username,
    })

    if (updatedUser) {
      res.json({
        success: true,
        description: 'Username updated successfully',
        statusCode: 201,
      })
    }
  } catch (err) {
    console.error(err)
    next({})
  }
}

export { updateUsername }
