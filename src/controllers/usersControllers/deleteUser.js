import { deleteSingleUser } from '../../usecases/userUsecases/deleteSingleUser.js'

const deleteUser = async (req, res, next) => {
  try {
    const { userId } = req.params

    const deletedUser = await deleteSingleUser(userId)

    if (deletedUser) {
      res.json({
        message: 'success',
        data: 'Deleted user successfully',
        statusCode: 204,
      })
    }
  } catch (err) {
    console.error(err)
    next({})
  }
}

export { deleteUser }
