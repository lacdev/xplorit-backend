import { ApiError } from '../../errors/ApiError.js'
import validator from 'express-validator'
const { param, body, check, validationResult } = validator
import { getSinglePlace } from '../../usecases/placeUsecases/getSinglePlace.js'
import { isEmptyObject } from '../../utils/checkForEmpyObject.js'

const validatePlaceUpdate = async (req, res, next) => {
  try {
    const { placeId } = req.params

    const placeIdChain = param('placeId')
      .exists()
      .withMessage('Please provide a place ID.')
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
      .trim()
      .escape()
      .run(req)

    const descriptionChain = body('description')
      .exists({ checkNull: true, checkFalsy: true })
      .not()
      .isEmpty()
      .withMessage('Please provide a description for the place.')
      .isString()
      .withMessage('Name must be a string.')
      .isLength({ max: 2000 })
      .trim()
      .escape()
      .run(req)

    const addressChain = check('address')
      .exists({ checkNull: true, checkFalsy: true })
      .not()
      .isEmpty()
      .withMessage('Address must be an object.')
      .run(req)

    const streetChain = check('address.street')
      .exists({ checkNull: true, checkFalsy: true })
      .not()
      .isEmpty()
      .withMessage('please provide a street')
      .run(req)

    const cityChain = check('address.city')
      .exists({ checkNull: true, checkFalsy: true })
      .not()
      .isEmpty()
      .withMessage('please provide a city')
      .run(req)

    const stateChain = check('address.state')
      .exists({ checkNull: true, checkFalsy: true })
      .not()
      .isEmpty()
      .withMessage('please provide a state')
      .run(req)

    const zipCodeChain = check('address.zipcode')
      .exists({ checkNull: true, checkFalsy: true })
      .not()
      .isEmpty()
      .isNumeric()
      .withMessage('Zipcode must be a valid number.')
      .run(req)

    const tagsChain = body('tags')
      .isArray()
      .withMessage('Tags must be an array.')
      .run(req)

    const scheduleStartChain = body('scheduleStart')
      .exists({ checkNull: true, checkFalsy: true })
      .isDate()
      .withMessage('Schedule start is not a valid date.')
      .run(req)

    const scheduleFinishChain = body('scheduleFinish')
      .exists({ checkNull: true, checkFalsy: true })
      .isDate()
      .withMessage('Schedule finish is not a valid date.')
      .run(req)

    const latitudeChain = check('ubication.lat')
      .not()
      .isEmpty()
      .withMessage('please provide a latitude')
      .isNumeric()
      .withMessage('Latitude is not valid.')
      .run(req)

    const longitudeChain = check('ubication.long')
      .not()
      .isEmpty()
      .withMessage('please provide a longitude')
      .isNumeric()
      .withMessage('Longitude is not valid.')
      .run(req)

    // const imagesChain = body('images')
    //   .exists({ checkNull: true, checkFalsy: true })
    //   .isArray()
    //   .withMessage('Images must be an array.')
    //   .run(req)

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

    const placeExists = await getSinglePlace(placeId)

    if (isEmptyObject(placeExists)) {
      next(ApiError.badRequest('Place not found.'))
      return
    }
    next()
  } catch (e) {
    console.error(e)
    next({})
  }
}

export { validatePlaceUpdate }
