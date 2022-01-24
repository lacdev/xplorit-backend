/* eslint-disable no-unused-vars */
import { ApiError } from '../errors/ApiError.js'

const ApiErrorHandler = (err, req, res, next) => {
  //Don't console log in production because it is not async
  console.error(err)

  if (err instanceof ApiError) {
    res.status(err.code).json(err.message)
    return
  }

  res.status(500).json('Something went wrong')
}

export { ApiErrorHandler }
