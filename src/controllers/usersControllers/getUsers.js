import { getAllUsers } from '../../usecases/userUsecases/getAllUsers.js'

const getUsers = async (req, res, next) => {
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
    next({})
  }
}

export { getUsers }
