import { createSingleUser } from '../../usecases/userUsecases/createSingleUser.js'
import { hashPassword } from '../../lib/bcrypt.js'
import gravatar from 'gravatar'

const saveUser = async (req, res, next) => {
  try {
    const { username, password, email } = req.body

    const secureUrl = gravatar.url(
      email,
      { s: '128', r: 'g', d: 'identicon' },
      true
    )

    const hashedPassword = await hashPassword(password)

    const savedUser = await createSingleUser({
      username,
      password: hashedPassword,
      email,
      avatar: secureUrl,
      coverPhoto: 'default',
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
