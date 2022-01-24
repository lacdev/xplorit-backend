import { getAllUsers } from '../../usecases/userUsecases/getAllUsers.js'

const getUsers = async (req, res) => {
  try {
    const allUsers = await getAllUsers()

    res.json({
      payload: {
        message: 'success',
        statusCode: 200,
        data: allUsers,
      },
    })
  } catch (err) {
    console.error(err)
    res.json({
      error: {
        message: 'failure',
        description: 'Could not get users.',
        statusCode: 404,
      },
    })
  }
}

export { getUsers }
