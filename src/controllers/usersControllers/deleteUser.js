import { getSingleUser } from '../../usecases/userUsecases/getSingleUser.js'
import { deleteSingleUser } from '../../usecases/userUsecases/deleteSingleUser.js'

const deleteUser = async (req, res) => {
  try {
    const { userId } = req.params

    const foundUser = await getSingleUser(userId)

    const deletedUser = await deleteSingleUser(foundUser._id)

    if (deletedUser) {
      res.json({
        message: 'success',
        payload: {
          data: 'No content',
          description: 'Deleted user successfully',
          statusCode: 204,
        },
      })
    }
  } catch (err) {
    console.error(err)
    res.json({
      message: 'failure',
      error: {
        err,
        description: 'User not found.',
        statusCode: 404,
      },
    })
  }
}

export { deleteUser }
