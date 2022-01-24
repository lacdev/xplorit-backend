import { updateSingleUser } from '../../usecases/userUsecases/updateSingleUser.js'
import { hashPassword } from '../../lib/bcrypt.js'
import { getSingleUser } from '../../usecases/userUsecases/getSingleUser.js'
import { ApiError } from '../../errors/ApiError.js'

const updateUser = async (req, res) => {
  try {
    const { userId } = req.params

    if (!userId) {
      res.json({
        message: 'failure',
        error: {
          description: 'User ID not provided',
          statusCode: 400,
        },
      })

      return
    }

    const foundUser = await getSingleUser(userId)

    if (!foundUser) {
      res.json({
        message: 'failure',
        error: {
          description: 'User not found.',
          statusCode: 404,
        },
      })

      return
    }

    const { username, password } = req.body

    const hashedPass = await hashPassword(password)

    const updatedUser = await updateSingleUser(userId, {
      username,
      password: hashedPass,
    })

    if (updatedUser) {
      res.json({
        success: true,
        description: 'User updated successfully',
        statusCode: 201,
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

export { updateUser }
