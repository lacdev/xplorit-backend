import { getSingleUser } from '../../usecases/userUsecases/getSingleUser.js'

const getUser = async (req, res) => {
  const { userId } = req.params

  try {
    const user = await getSingleUser(userId)

    res.json({
      message: 'success',
      description: 'User found',
      statusCode: 200,
      user,
    })
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

export { getUser }
