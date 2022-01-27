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
      .isObject()
      .withMessage('Address must be an object.')
      .run(req)

    //   {street, city, state, zipcode}
    const streetChain = check('address.street')
      .exists({ checkNull: true, checkFalsy: true })
      .isString()
      .withMessage('Street must be a valid string.')
      .isLength({ max: 200 })
      .withMessage('Street name too big.')
      .run(req)

    const cityChain = check('address.city')
      .exists({ checkNull: true, checkFalsy: true })
      .isString()
      .withMessage('City must be a valid string.')
      .isLength({ max: 50 })
      .withMessage('Street name too big.')
      .run(req)

    const stateChain = check('address.state')
      .exists({ checkNull: true, checkFalsy: true })
      .isString()
      .withMessage('State must be a valid string.')
      .isLength({ max: 50 })
      .withMessage('State name too big.')
      .run(req)

    const zipCodeChain = check('address.state')
      .exists({ checkNull: true, checkFalsy: true })
      .isNumeric()
      .withMessage('Zipcode must be a valid number.')
      .isLength({ max: 5 })
      .withMessage('Zipcode is not valid.')
      .run(req)

    const tagsChain = body('tags')
      .exists({ checkNull: true, checkFalsy: true })
      .isArray()
      .withMessage('Tags must be an array.')
      //   .isLength({ max: 4 })
      //   .withMessage('Tags items max must be 4.')
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

    const ubicationChain = check('ubication')
      .exists({ checkNull: true, checkFalsy: true })
      .isObject()
      .withMessage('Ubication must be an object.')
      .run(req)

    const latitudeChain = check('ubication.lat')
      .exists({ checkNull: true, checkFalsy: true })
      .isNumeric()
      .withMessage('Latitude is not valid.')
      .run(req)

    const longitudeChain = check('ubication.long')
      .exists({ checkNull: true, checkFalsy: true })
      .isNumeric()
      .withMessage('Longitude is not valid.')
      .run(req)

    const imagesChain = body('images')
      .exists({ checkNull: true, checkFalsy: true })
      .isArray()
      .withMessage('Images must be an array.')
      //   .isLength({ max: 6 })
      //   .withMessage('Images items max must be 6.')
      .run(req)

    await ownerIdChain
    await nameChain
    await descriptionChain
    await addressChain
    await streetChain
    await cityChain
    await stateChain
    await zipCodeChain
    await tagsChain
    await scheduleStartChain
    await scheduleFinishChain
    await ubicationChain
    await latitudeChain
    await longitudeChain
    await imagesChain

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
    next(ApiError.internalError('Something went wrong.'))
  }
}

export { validatePlaceCreation }
