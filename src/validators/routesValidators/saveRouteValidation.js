import { ApiError } from '../../errors/ApiError.js'
import validator from 'express-validator'
import { searchForUserBeforeCreation } from '../../usecases/userUsecases/searchUserBeforeCreation.js'
import { isEmptyArray } from '../../utils/checkForEmptyArray.js'
const { body, check, validationResult } = validator

const validateRouteCreation = async (req, res, next) => {
  try {
    const newRoute = req.body

    const { ownerId } = newRoute
    console.log('owner', ownerId)
    console.log('new Route:', newRoute)

    const ownerIdChain = body('ownerId')
      .exists({ checkNull: true, checkFalsy: true })
      .withMessage('Please provide a valid ID.')
      .isMongoId()
      .withMessage('Please provide a valid ID.')
      .run(req)

    const nameChain = body('name')
      .exists({ checkNull: true, checkFalsy: true })
      .not()
      .isEmpty()
      .withMessage('Please provide a name for the place.')
      .isString()
      .withMessage('Name must be a string.')
      .isLength({ max: 300 })
      .run(req)

    const descriptionChain = body('description')
      .exists({ checkNull: true, checkFalsy: true })
      .not()
      .isEmpty()
      .withMessage('Please provide a description for the place.')
      .isString()
      .withMessage('Name must be a string.')
      .isLength({ max: 300 })
      .run(req)

    const tagsChain = body('tags')
      .isArray()
      .withMessage('Tags must be an array.')
      .run(req)

    const fullRouteChain = body('fullRoute')
      .isArray()
      .withMessage('fullRoute must be an array.')
      .run(req)

    const latitudeChain = check('fullRoute.*.lat')
      .not()
      .isEmpty()
      .withMessage('please provide a latitude')
      .isNumeric()
      .withMessage('Latitude is not valid.')
      .run(req)

    const longitudeChain = check('fullRoute.*.long')
      .not()
      .isEmpty()
      .withMessage('please provide a longitude')
      .isNumeric()
      .withMessage('Longitude is not valid.')
      .run(req)

    const imagesChain = body('images')
      .exists({ checkNull: true, checkFalsy: true })
      .isArray()
      .withMessage('Images must be an array.')
      .run(req)

    await Promise.all([
      ownerIdChain,
      nameChain,
      descriptionChain,
      tagsChain,
      fullRouteChain,
      latitudeChain,
      longitudeChain,
      imagesChain,
    ])

    const result = validationResult(req)

    if (!result.isEmpty()) {
      next(
        ApiError.badRequest({ message: 'Bad Request', errors: result.array() })
      )
      return
    }

    const userNameExists = await searchForUserBeforeCreation({
      _id: ownerId,
    })

    if (isEmptyArray(userNameExists)) {
      next(ApiError.badRequest('User not found.'))
      return
    }

    next()
  } catch (error) {
    console.error(error)
    next({})
  }
}

export { validateRouteCreation }
