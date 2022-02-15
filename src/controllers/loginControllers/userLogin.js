import { searchUserBeforeLogin } from '../../usecases/userUsecases/getUserForLogin.js'
import { ApiError } from '../../errors/ApiError.js'
import { comparePassword } from '../../lib/bcrypt.js'
import jwt from 'jsonwebtoken'
import { variables } from '../../config/config.js'

const loginUser = async (req, res, next) => {
  try {
    const { email, password } = req.body

    const SECRET = variables.JWT_SECRET

    const user = await searchUserBeforeLogin({ email: email })

    if (!user) {
      next(ApiError.badRequest('The email or password is incorrect.'))
      return
    }

    const match = await comparePassword(password, user.password)

    if (!match) {
      next(ApiError.badRequest('The email or password is incorrect.'))
      return
    }

    const payload = {
      user: user.username,
      id: user._id,
    }

    const signedJWT = jwt.sign(payload, SECRET, {
      algorithm: 'HS256',
      expiresIn: '24h',
    })

    res.json({ token: signedJWT })
  } catch (error) {
    console.log(error)
    next({})
  }
}

export { loginUser }
