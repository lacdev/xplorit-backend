import { getSingleUser } from '../../usecases/userUsecases/getSingleUser.js'

const getUser = async (req, res, next) => {
  try {
    const { userId } = req.params

    const foundUser = await getSingleUser(userId)

    if (foundUser) {
      res.json({
        message: 'success',
        description: 'User found',
        statusCode: 200,
        foundUser,
      })
    }
  } catch (err) {
    console.error(err)
    next({})
  }
}

export { getUser }
