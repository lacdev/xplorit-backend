import Ajv from 'ajv'
import { ApiError } from '../../errors/ApiError.js'
import { getPlaceSchema } from '../../schemas/getPlaceSchema.js'
const ajv = new Ajv()

const validateGetPlaceQuery = (req, res, next) => {
  const valid = ajv.validate(getPlaceSchema, req.query)

  if (!valid) {
    next(ApiError.badRequest(ajv.errors))
    return
  }

  next()
}

export { validateGetPlaceQuery }
