import { createSingleUser } from '../../usecases/userUsecases/createSingleUser.js'
import { hashPassword } from '../../lib/bcrypt.js'

const saveUser = async (req, res) => {
  try {
    const { username, password, email } = req.body

    const hashedPassword = await hashPassword(password)

    const savedUser = await createSingleUser({
      username,
      password: hashedPassword,
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
        description: 'Bad Request',
        statusCode: 400,
      },
    })
  }
}

export { saveUser }
