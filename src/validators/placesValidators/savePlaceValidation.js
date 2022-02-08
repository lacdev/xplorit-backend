import { ApiError } from '../../errors/ApiError.js'
import validator from 'express-validator'
import { searchForUserBeforeCreation } from '../../usecases/userUsecases/searchUserBeforeCreation.js'
import { isEmptyArray } from '../../utils/checkForEmptyArray.js'
const { body, check, validationResult } = validator
// import variables from '../../config/config.js'
// // import Jimp from 'jimp'
// // import Cloud from '@google-cloud/storage'
// import { Storage } from '@google-cloud/storage'
// // const { Storage } = Cloud
// import { Buffer } from 'buffer'

// import { variables } from '../../config/config.js'
// import { Storage } from '@google-cloud/storage'

// const storage = new Storage({ keyFilename: './src/config/key.json' })

// const bucket = storage.bucket(variables.gcp_bucket)

const validatePlaceCreation = async (req, res, next) => {
  try {
    const { ownerId } = req.body

    // console.log(images)
    // const buffersArray = []

    // images.forEach(async (image, index) => {
    //   let matches = image.match(/^data:([A-Za-z-+/]+);base64,(.+)$/)

    //   if (matches.length !== 3) {
    //     return new Error('Invalid input string')
    //   }

    //   const buffer = Buffer.from(matches[2], 'base64')

    //   const file = bucket.file(`places/${ownerId}/image${index}.jpg`)

    //   await file
    //     .save(buffer)

    //     .then(() => {
    //       const content = file.publicUrl()
    //       // const publicUrl = `https://storage.googleapis.com/xplorit-images/${file}`
    //       buffersArray.push(content)
    //       // console.log('Your files are available at:', buffersArray)
    //     })
    //     .then(() => {
    //       console.log('Async files are there????', buffersArray)

    //       image = buffersArray[index]
    //     })
    //     // .then(() => console.log("Are my images being modified???", image))

    //     .catch((e) => console.error(e))
    // })

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

    const locationChain = body('location')
      .exists({ checkNull: true, checkFalsy: true })
      .not()
      .isEmpty()
      .withMessage('Location must be an object.')
      .run(req)

    const pointChain = body('location.type')
      .exists({ checkNull: true, checkFalsy: true })
      .matches('Point')
      .withMessage('type of location must be a string named Point.')
      .not()
      .isEmpty()
      .withMessage('Point must be a a string.')
      .run(req)

    const coordenatesChain = body('location.coordinates')
      .exists({ checkNull: true, checkFalsy: true })
      .isArray()
      .withMessage('Coordenates must be a valid GeoJSON Array.')
      .not()
      .isEmpty()
      .withMessage('Coordenates must be an array of valid coordenates.')
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
      locationChain,
      pointChain,
      coordenatesChain,
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
