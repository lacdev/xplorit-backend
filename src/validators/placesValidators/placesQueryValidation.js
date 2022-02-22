import { ApiError } from '../../errors/ApiError.js'
import { placeQuerySchema } from '../../schemas/placeQuery.js'
import Ajv from 'ajv'

const ajv = new Ajv()

const validatePlacesQuery = async (req, res, next) => {
  try {
    const valid = ajv.validate(placeQuerySchema, req.query)

    if (!valid) next(ApiError.badRequest(ajv.errors))

    next()
  } catch (e) {
    next({})
  }
}

export { validatePlacesQuery }
