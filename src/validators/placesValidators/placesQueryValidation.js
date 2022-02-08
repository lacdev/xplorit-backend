import { ApiError } from '../../errors/ApiError.js'
import { placeQuerySchema } from '../../schemas/placeQuery.js'
import Ajv from 'ajv'

const ajv = new Ajv()

const validatePlacesQuery = (req, res, next) => {
  const valid = ajv.validate(placeQuerySchema, req.query)

  if (!valid) {
    next(ApiError.badRequest(ajv.errors))
    return
  }
  next()
}

export { validatePlacesQuery }
