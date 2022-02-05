import { createSingleUser } from '../../usecases/userUsecases/createSingleUser.js'
import { hashPassword } from '../../lib/bcrypt.js'

const saveUser = async (req, res, next) => {
  try {
    const { username, password, email, avatar, coverPhoto } = req.body

    const hashedPassword = await hashPassword(password)

    const savedUser = await createSingleUser({
      username,
      password: hashedPassword,
      email,
      avatar,
      coverPhoto,
    })

    if (savedUser) {
      res.json({
        success: true,
        description: 'New user created successfully',
        statusCode: 201,
      })
    }
  } catch (err) {
    console.error(err)
    next({})
  }
}

export { saveUser }
