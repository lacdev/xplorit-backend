import { getAllUsers } from '../../usecases/userUsecases/getAllUsers.js'

const getUsers = async (req, res) => {
  try {
    const allUsers = await getAllUsers()

    res.json({
      message: 'success',
      payload: {
        data: allUsers,
        statusCode: 200,
      },
    })
  } catch (err) {
    console.error(err)
    res.json({
      message: 'failure',
      error: {
        err,
        description: 'Could not get users.',
        statusCode: 404,
      },
    })
  }
}

export { getUsers }
