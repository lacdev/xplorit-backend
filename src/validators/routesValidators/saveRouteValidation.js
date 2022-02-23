import { ApiError } from '../../errors/ApiError.js'
import validator from 'express-validator'
import { getSingleUser } from '../../usecases/userUsecases/getSingleUser.js'
import { sanitizeInput } from '../../utils/inputSanitizer.js'
const { body, validationResult } = validator

const validateRouteCreation = async (req, res, next) => {
  try {
    const { id } = req.user

    const foundUser = await getSingleUser({ _id: id })

    if (!foundUser) {
      next(ApiError.badRequest('User not found.'))
      return
    }

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
      .withMessage('Description must be a string.')
      .isLength({ max: 3000 })
      .trim()
      .run(req)

    const tagsChain = body('tags')
      .isArray()
      .withMessage('Tags must be an array.')
      .run(req)

    const tagsStringsChain = body('tags.*')
      .isString()
      .withMessage('tags inside tags array must be strings.')
      .run(req)

    const locationChain = body('location')
      .exists({ checkNull: true, checkFalsy: true })
      .not()
      .isEmpty()
      .withMessage('Location must be an object.')
      .run(req)

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
      nameChain,
      descriptionChain,
      tagsChain,
      tagsStringsChain,
      locationChain,
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

    const sanitizedDescription = sanitizeInput(req.body?.description)

    req.body.description = sanitizedDescription

    const owner = id //equals to the decoded token user identity's id.

    req.body.ownerId = owner

    next()
  } catch (error) {
    console.error(error)
    next({})
  }
}

export { validateRouteCreation }
