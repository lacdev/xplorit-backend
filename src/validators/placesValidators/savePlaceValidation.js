import { ApiError } from '../../errors/ApiError.js'
import validator from 'express-validator'
import { searchForUserBeforeCreation } from '../../usecases/userUsecases/searchUserBeforeCreation.js'
import { isEmptyArray } from '../../utils/checkForEmptyArray.js'
const { body, check, validationResult } = validator

const validatePlaceCreation = async (req, res, next) => {
  try {
    const { ownerId } = req.body

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

    const imagesChain = body('images')
      .exists({ checkNull: true, checkFalsy: true })
      .isArray()
      .withMessage('Images must be an array.')
      .run(req)

    await Promise.all([
      ownerIdChain,
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

export { validatePlaceCreation }
