import { ApiError } from '../../errors/ApiError.js'
import validator from 'express-validator'
const { param, body, check, validationResult } = validator
import { getSinglePlace } from '../../usecases/placeUsecases/getSinglePlace.js'
import { getSingleUser } from '../../usecases/userUsecases/getSingleUser.js'
import { sanitizeInput } from '../../utils/inputSanitizer.js'

const validatePlaceUpdate = async (req, res, next) => {
  try {
    const { placeId } = req.params

    const { id } = req.user

    const placeExists = await getSinglePlace({ _id: placeId })

    if (!placeExists) {
      next(ApiError.badRequest('Place not found.'))
      return
    }

    const { ownerId } = placeExists

    const placeOwner = ownerId._id.toString()

    if (placeOwner !== id) {
      next(
        ApiError.unauthorized(
          'Only the owner is authorized to edit this place.'
        )
      )
    }

    const foundUser = await getSingleUser({ _id: id })

    if (!foundUser) {
      next(ApiError.badRequest('User not found.'))
      return
    }

    const placeIdChain = param('placeId')
      .exists()
      .withMessage('Please provide a place ID.')
      .isMongoId()
      .withMessage('Please provide a valid ID.')
      .run(req)

    const nameChain = body('name')
      .optional()
      .exists({ checkNull: true, checkFalsy: true })
      .not()
      .isEmpty()
      .withMessage('Please provide a name for the place.')
      .isString()
      .withMessage('Name must be a string.')
      .isLength({ max: 300 })
      .trim()
      .escape()
      .run(req)

    const descriptionChain = body('description')
      .optional()
      .exists({ checkNull: true, checkFalsy: true })
      .not()
      .isEmpty()
      .withMessage('Please provide a description for the place.')
      .isString()
      .withMessage('Name must be a string.')
      .isLength({ max: 3000 })
      .trim()
      .run(req)

    const addressChain = check('address')
      .optional()
      .exists({ checkNull: true, checkFalsy: true })
      .not()
      .isEmpty()
      .withMessage('Address must be an object.')
      .run(req)

    const streetChain = check('address.street')
      .optional()
      .exists({ checkNull: true, checkFalsy: true })
      .not()
      .isEmpty()
      .withMessage('please provide a street')
      .run(req)

    const cityChain = check('address.city')
      .optional()
      .exists({ checkNull: true, checkFalsy: true })
      .not()
      .isEmpty()
      .withMessage('please provide a city')
      .run(req)

    const stateChain = check('address.state')
      .optional()
      .exists({ checkNull: true, checkFalsy: true })
      .not()
      .isEmpty()
      .withMessage('please provide a state')
      .run(req)

    const zipCodeChain = check('address.zipcode')
      .optional()
      .exists({ checkNull: true, checkFalsy: true })
      .not()
      .isEmpty()
      .isNumeric()
      .withMessage('Zipcode must be a valid number.')
      .run(req)

    const tagsChain = body('tags')
      .optional()
      .isArray()
      .withMessage('Tags must be an array.')
      .run(req)

    const scheduleStartChain = body('scheduleStart')
      .optional()
      .exists({ checkNull: true, checkFalsy: true })
      .isDate()
      .withMessage('Schedule start is not a valid date.')
      .run(req)

    const scheduleFinishChain = body('scheduleFinish')
      .optional()
      .exists({ checkNull: true, checkFalsy: true })
      .isDate()
      .withMessage('Schedule finish is not a valid date.')
      .run(req)

    const latitudeChain = check('ubication.lat')
      .optional()
      .not()
      .isEmpty()
      .withMessage('please provide a latitude')
      .isNumeric()
      .withMessage('Latitude is not valid.')
      .run(req)

    const longitudeChain = check('ubication.long')
      .optional()
      .not()
      .isEmpty()
      .withMessage('please provide a longitude')
      .isNumeric()
      .withMessage('Longitude is not valid.')
      .run(req)

    await Promise.all([
      placeIdChain,
      nameChain,
      descriptionChain,
      addressChain,
      streetChain,
      cityChain,
      stateChain,
      zipCodeChain,
      tagsChain,
      scheduleStartChain,
      scheduleFinishChain,
      latitudeChain,
      longitudeChain,
    ])

    const result = validationResult(req)

    if (!result.isEmpty()) {
      next(
        ApiError.badRequest({ message: 'Bad Request', errors: result.array() })
      )
      return
    }

    const sanitizedDescription = sanitizeInput(req.body?.description)

    req.body.description = sanitizedDescription

    next()
  } catch (e) {
    console.error(e)
    next({})
  }
}

export { validatePlaceUpdate }
