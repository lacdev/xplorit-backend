import { getSingleUser } from '../../usecases/userUsecases/getSingleUser.js'
import { deleteSingleUser } from '../../usecases/userUsecases/deleteSingleUser.js'

const deleteUser = async (req, res) => {
  try {
    const { userId } = req.params

    if (!userId) {
      res.json({
        message: 'failure',
        statusCode: 400,
        description: 'Please provide a valid user ID',
      })
    }

    const foundUser = await getSingleUser(userId)

    if (!foundUser) {
      res.json({
        message: 'failure',
        statusCode: 404,
        description: 'User not found.',
      })
    }

    const { _id } = foundUser

    const deletedUser = await deleteSingleUser(_id)

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
        description: 'User not found.',
        statusCode: 404,
      },
    })
  }
}

export { deleteUser }
