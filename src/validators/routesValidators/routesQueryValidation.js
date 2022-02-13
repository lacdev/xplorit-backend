import { ApiError } from '../../errors/ApiError.js'
import { routeQuerySchema } from '../../schemas/routeQuery.js'
import Ajv from 'ajv'

const ajv = new Ajv()

const validateRoutesQuery = async (req, res, next) => {
  try {
    const valid = ajv.validate(routeQuerySchema, req.query)

    if (!valid) next(ApiError.badRequest(ajv.errors))

    next()
  } catch (e) {
    next({})
  }
}

export { validateRoutesQuery }
