import { createSingleUser } from '../../usecases/userUsecases/createSingleUser.js'
import { hashPassword } from '../../lib/bcrypt.js'

const saveUser = async (req, res) => {
  try {
    const newUser = req.body

    const { username, password, email } = newUser

    const hashedPass = await hashPassword(password)

    const savedUser = await createSingleUser({
      username,
      password: hashedPass,
      email,
    })

    res.json({
      message: 'success',
      payload: {
        data: savedUser,
        description: 'User created successfully',
        statusCode: 200,
      },
    })
  } catch (err) {
    console.error(err)
    res.json({
      message: 'failure',
      error: {
        err,
        description: 'Could not create user.',
        statusCode: 400,
      },
    })
  }
}

export { saveUser }
