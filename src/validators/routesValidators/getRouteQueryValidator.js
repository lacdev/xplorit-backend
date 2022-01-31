import Ajv from 'ajv'
import { ApiError } from '../../errors/ApiError.js'
import { getRouteSchema } from '../../schemas/getRouteSchema.js'
const ajv = new Ajv()

const validateGetRouteQuery = async (req, res, next) => {
  try {
    const valid = await ajv.validate(getRouteSchema, req.query)

    if (!valid) next(ApiError.badRequest(ajv.errors))

    next()
  } catch (e) {
    next({})
  }
}

export { validateGetRouteQuery }
