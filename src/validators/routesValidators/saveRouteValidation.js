import { ApiError } from '../../errors/ApiError.js'
import validator from 'express-validator'
import { getSingleUser } from '../../usecases/userUsecases/getSingleUser.js'
const { body, validationResult } = validator
// check,
const validateRouteCreation = async (req, res, next) => {
  try {
    const newRoute = req.body

    const { ownerId } = newRoute

    // const { id } = req.user

    //Validate payload equals to the user in the database they need to match.
    //Otherwise throw an error.

    // const foundUser = await getSingleUser({ _id: id })

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
      .isLength({ max: 1000 })
      .run(req)

    const tagsChain = body('tags')
      .isArray()
      .withMessage('Tags must be an array.')
      .run(req)

    const tagsStringsChain = body('tags.*')
      .isString()
      .withMessage('tags inside tags array must be strings.')
      .run(req)

    const fullRouteChain = body('fullRoute')
      .isArray()
      .withMessage('fullRoute must be an array.')
      .run(req)

    // const pointChain = check('fullRoute.*.type')
    //   .not()
    //   .isEmpty()
    //   .withMessage('please provide a latitude')
    //   .isString()
    //   .withMessage('type must be a valid string named Point.')
    //   .run(req)

    // const coordinatesChain = check('fullRoute.*.coordinates')
    //   .isArray()
    //   .withMessage('Coordinates must be a valid GeoJSON Array')
    //   .not()
    //   .isEmpty()
    //   .withMessage('please provide a valid coordinates array.')
    //   .run(req)

    const imagesChain = body('images')
      .exists({ checkNull: true, checkFalsy: true })
      .isArray()
      .withMessage('Images must be an array.')
      .run(req)

    const imagesUrlsChain = body('images.*')
      .exists()
      .isURL()
      .withMessage(
        'Images array must contain an array of valid URL strings and a maximum of 6 items.'
      )
      .run(req)

    await Promise.all([
      ownerIdChain,
      nameChain,
      descriptionChain,
      tagsChain,
      tagsStringsChain,
      fullRouteChain,
      // pointChain,
      // coordinatesChain,
      imagesChain,
      imagesUrlsChain,
    ])

    const result = validationResult(req)

    if (!result.isEmpty()) {
      next(
        ApiError.badRequest({ message: 'Bad Request', errors: result.array() })
      )
      return
    }

    // const foundUser = await getSingleUser({ _id: id })

    const userNameExists = await getSingleUser({
      _id: ownerId,
    })

    if (!userNameExists) {
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
