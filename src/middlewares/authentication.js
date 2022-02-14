import jwt from 'jsonwebtoken'
import { variables } from '../config/config.js'
import { ApiError } from '../errors/ApiError.js'

const verifyToken = async (req, res, next) => {
  try {
    const SECRET = variables.JWT_SECRET

    // U should use the req.get(headerName) method
    const token = req.header('authorization')

    next(ApiError.badRequest('A token must be provided.'))

    console.log('is this my token?', token)

    // const someDumbToken =
    //   'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyIjoidXNlcjEiLCJpZCI6IjYxZWY2ODI3OTI2MmUyZjE2NzcwMGNhZiIsImlhdCI6MTY0NDgwMTkwNiwiZXhwIjoxNjQ0ODg4MzA2fQ.jsmi7TQedcPUFZPBqEeSu7cF-zDulcAUNYb5GXa0nGY'

    const valid = jwt.verify(token, SECRET)

    if (!valid) {
      next(ApiError.unauthorized('A valid token is required for access.'))
    }

    next()
  } catch (err) {
    if (err.name === 'JsonWebTokenError') {
      next(ApiError.badRequest({ error: err.message }))
    }
    console.error(err)
    next({})
  }
}

export { verifyToken }
