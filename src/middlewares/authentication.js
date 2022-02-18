import jwt from 'jsonwebtoken'
import { variables } from '../config/config.js'
import { ApiError } from '../errors/ApiError.js'

const verifyToken = async (req, res, next) => {
  try {
    const SECRET = variables.JWT_SECRET

    const token = req.header('authorization')

    if (!token) {
      next(ApiError.unauthorized('Unathorized Access. Token not provided.'))
    }

    const decoded = jwt.verify(token, SECRET)

    if (!decoded) {
      next(
        ApiError.unauthorized('Unathorized Access. A valid token is required.')
      )
    }

    req.user = decoded

    /* Request User is going to be equal to the decoded identity object from the user.
     user = { 
      id: mongoId, 
      username: exampleUserName 
    } */

    next()
  } catch (err) {
    if (err.name === 'JsonWebTokenError') {
      next(ApiError.unauthorized({ error: err.message }))
    }

    if (err.name === 'TokenExpiredError') {
      next(ApiError.unauthorized({ error: err.message }))
    }
    console.error(err)
    next({})
  }
}

export { verifyToken }
