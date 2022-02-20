import jwt from 'jsonwebtoken'
import { variables } from '../config/config.js'
import { ApiError } from '../errors/ApiError.js'

const verifyToken = async (req, res, next) => {
  try {
    const SECRET = variables.JWT_SECRET

    const tokenHeaders = req.header('authorization')

    if (!(tokenHeaders && tokenHeaders.split(' ')[0] === 'Bearer')) {
      next(ApiError.unauthorized('Not a valid token was provided.'))
      return
    }

    const tokenArray = tokenHeaders.split(' ')

    console.log('This is the token array splitted', tokenArray)

    const token = tokenArray[1]

    console.log('This is my token array 1 index', token)

    // if (token.startsWith('Bearer ')) {
    //   token = authHeader.substring(7, authHeader.length)
    // } else {
    //   //Error
    // }

    // const tokenExtracted = token.split(' ')[1]

    // console.log('token extracted', tokenExtracted)

    // if (!tokenExtracted) {
    //   next(ApiError.unauthorized('Unathorized Access. Token not provided.'))
    // }

    if (!token) {
      next(ApiError.unauthorized('Unathorized Access. Token not provided.'))
    }

    const decoded = jwt.verify(token, SECRET)

    console.log('token decoded object', decoded)

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
