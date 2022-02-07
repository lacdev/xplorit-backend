/* eslint-disable no-unused-vars */
import { ApiError } from '../../errors/ApiError.js'
import validator from 'express-validator'
import { searchForUserBeforeCreation } from '../../usecases/userUsecases/searchUserBeforeCreation.js'
import { isEmptyArray } from '../../utils/checkForEmptyArray.js'

const handleImagesUpload = async (req, res, next) => {
  try {
    if (!req.body.images) {
      next(ApiError.badRequest('No images found to be uploaded.'))
    }

    const bucket = storage.bucket(variables.GCP_BUCKET)

    const uploadImages = async (id, images) => {
      try {
        const unresolvedPromises = images.map((image, index) => {
          let matches = image.match(/^data:([A-Za-z-+/]+);base64,(.+)$/)

          if (matches.length !== 3) {
            return new Error('Invalid input string')
          }

          const buffer = Buffer.from(matches[2], 'base64')

          const file = bucket.file(`places/${id}/image${index}.jpg`)

          file
            .save(buffer)
            .then(() => {
              let content = file.publicUrl()
              return content
            })
            .catch((e) => console.error(e))
        })

        return await Promise.all(unresolvedPromises)
        // return await Promise.all(results)
      } catch (e) {
        console.error(e)
      }
    }

    // console.log('Log the body pls', req.body)
    // const buffersArray = []

    const { ownerId } = req.body

    const newImages = await uploadImages(ownerId, req.body.images)

    req.body.images = newImages

    // const publicUrl = `https://storage.googleapis.com/xplorit-images/${file}`
    // buffersArray.push(content)
    // console.log('Your files are available at:', buffersArray)

    console.log('new images???', newImages)

    // .then(async () => {
    //   const newImages = await mutateImagesArray(
    //     req.body.images,
    //     buffersArray
    //   )
    //   req.body.images = newImages
    // })

    // const newArray = await mutateImagesArray(req.body.images, buffersArray)

    // req.body.images = newArray

    next()
  } catch (e) {
    next({})
  }
}

export { handleImagesUpload }

// const PATH = './public/'

// const multer = Multer({
//   storage: Multer.memoryStorage(),
//   limits: {
//     fileSize: 0.5 * 1024 * 1024, // no larger than 512kb.
//   },
// })

// // You can also use multer.array('data', numberofFiles)

// app.post('/', multer.any(), function (req, res) {
//   console.log(req.files)
//   var counter = 0
//   if (!req.files) {
//     res.status(400).send('No file uploaded.')
//     return
//   }

//   //  Create a new blob in the bucket and upload the file data.
//   req.files.forEach((fil) => {
//     const blob = bucket.file(fil.originalname)
//     const blobStream = blob.createWriteStream()

//     blobStream.on('finish', () => {
//       counter += 1
//       // The public URL can be used to directly access the file via HTTP.
//       const publicUrl = `https://storage.googleapis.com/${bucket.name}/${blob.name}`

//       if (counter >= 2) {
//         res.status(200).send(publicUrl)
//       }
//     })

//     blobStream.end(req.files.buffer)
//   })
// })

const { body, validationResult } = validator

const validateUserSignup = async (req, res, next) => {
  try {
    const { username, email } = req.body

    console.log('User Body?????', req.body)
    console.log('User Body files????', req.files)

    // const cpUpload = upload.fields([{ name: avatar, maxCount: 1 }])

    //Sanitization and validator chains on user registration requested information from body.

    const userEmailChain = body('email')
      .exists({ checkFalsy: true, checkNull: true })
      .withMessage('Email is required and must be filled.')
      .isEmail()
      .withMessage('Email is not a valid email.')
      .normalizeEmail()
      .run(req)

    const userPasswordChain = body('password')
      .exists({ checkFalsy: true, checkNull: true })
      .withMessage(
        'Password is required and must be at least 8 characters and should contain a number.'
      )
      .not()
      .isEmpty()
      .isLength({ min: 8 })
      .withMessage(
        'Password needs to be at least 8 Characters and should contain at least 1 number.'
      )
      .matches(/\d/)
      .withMessage('must contain a number')
      .run(req)

    const usernameChain = body('username')
      .exists({ checkFalsy: true, checkNull: true })
      .withMessage('Username is required and must be at least 4 characters.')
      .not()
      .isEmpty()
      .custom((value) => !/\s/.test(value))
      .withMessage('No spaces are allowed in the username')
      .trim()
      .escape()
      .run(req)

    const avatarChain = body('avatar')
      .optional()
      .isURL()
      .withMessage('Please provide a valid avatar URL')
      .trim()
      .escape()
      .run(req)

    const coverPhotoChain = body('coverPhoto')
      .optional()
      .isURL()
      .withMessage('Please provide a valid cover photo URL')
      .trim()
      .escape()
      .run(req)

    //Async Express validators array validation

    await Promise.all([
      usernameChain,
      userEmailChain,
      userPasswordChain,
      avatarChain,
      coverPhotoChain,
    ])

    const result = validationResult(req)

    if (!result.isEmpty()) {
      next(
        ApiError.badRequest({ message: 'Bad Request', errors: result.array() })
      )
      return
    }

    //Async Validation whether or not a username or an email exists already in the database.

    const userNameExists = await searchForUserBeforeCreation({
      username: username,
    })

    const emailExists = await searchForUserBeforeCreation({ email: email })

    if (!isEmptyArray(userNameExists)) {
      next(ApiError.badRequest('Username already registered.'))
      return
    }

    if (!isEmptyArray(emailExists)) {
      next(ApiError.badRequest('Email already registered.'))
      return
    }

    next()
  } catch (err) {
    console.error(err)
    next(ApiError.badRequest(err))
  }
}

export { validateUserSignup }
