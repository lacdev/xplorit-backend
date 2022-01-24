import { createSingleUser } from '../../usecases/userUsecases/createSingleUser.js'
import { hashPassword } from '../../lib/bcrypt.js'

const saveUser = async (req, res) => {
  try {
    const { username, password, email } = req.body

    const hashedPass = await hashPassword(password)

    const savedUser = await createSingleUser({
      username,
      password: hashedPass,
      email,
    })

    if (savedUser) {
      res.json({
        success: true,
        description: 'User created successfully',
        statusCode: 201,
      })
    }
  } catch (err) {
    console.error(err)
    res.json({
      message: 'failure',
      error: {
        err,
        description: 'Bad Request',
        statusCode: 400,
      },
    })
  }
}

export { saveUser }
