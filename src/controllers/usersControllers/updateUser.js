import { updateSingleUser } from '../../usecases/userUsecases/updateSingleUser.js'

const updateUser = async (req, res) => {
  try {
    const { id } = req.params
    const { body } = req.body

    const updatedUser = await updateSingleUser(id, body)

    res.json({
      message: 'success',
      payload: {
        data: updatedUser,
        description: 'Updated user successfully',
        statusCode: 200,
      },
    })
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

export { updateUser }
