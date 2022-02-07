import { ApiError } from '../../errors/ApiError.js'
import validator from 'express-validator'
const { param, body, validationResult } = validator
import { searchForUserBeforeCreation } from '../../usecases/userUsecases/searchUserBeforeCreation.js'
import { isEmptyArray } from '../../utils/checkForEmptyArray.js'
import sharp from 'sharp'
import { Buffer } from 'buffer'
import { variables } from '../../config/config.js'
import { Storage } from '@google-cloud/storage'

const validateUserUpdate = async (req, res, next) => {
  try {
    // console.log('is this my JSON for GCP??', JSON.parse(google_cloud_keys))

    const { userId } = req.params

    console.log(' are my files here?', req.files)

    console.log('Is this a valid body?', req.body)

    // console.log('Is my body parsed here bro?', JSON.parse(req.body.data))

    const typesAllowed = ['image/jpeg', 'image/png']

    if (!isEmptyArray(req.files)) {
      for (let image of req.files) {
        console.log(' are these my buffers bro?', image.buffer)
        if (typesAllowed.indexOf(image.mimetype) === -1) {
          next(
            ApiError.badRequest(
              'Only images of type png and jpeg are allowed with a maximum size of 256kb.'
            )
          )
          return
        } else {
          console.log('your images are allowed sir continue.')
        }
      }
    }

    //     new Storage({
    //       projectId: process.env.GOOGLE_STORAGE_PROJECT_ID,
    //       scopes: 'https://www.googleapis.com/auth/cloud-platform',
    //       credentials: {
    //         client_email: process.env.GOOGLE_STORAGE_EMAIL,
    //         private_key: process.env.GOOGLE_STORAGE_PRIVATE_KEY
    //       }
    // })
    // const storage = new Storage({
    //   projectId: variables.GCP_PROJECT_ID,
    //   scopes: 'https://www.googleapis.com/auth/cloud-platform',
    //   credentials: {
    //     client_email: variables.GCP_CLIENT_EMAIL,
    //     private_key: variables.GCP_PRIVATE_KEY,
    //   },
    // })

    const storage = new Storage({
      // keyFilename: JSON.parse(process.env.GCP_SECRET),
      keyFile: process.env.GCP_SECRET,
    })

    const bucket = storage.bucket(variables.GCP_BUCKET)

    const imagesUrls = []

    // for await (let [image, index] of req.files) {
    //   const newFile = image.buffer
    //   const file = bucket.file(
    //     `users/${userId}/${Date.now()}-image${index}.jpg`
    //   )
    //   await file.save(newFile).then(() => {
    //     const content = file.publicUrl()
    //     // const publicUrl = `https://storage.googleapis.com/xplorit-images/${file}`
    //     imagesUrls.push(content)
    //   })
    // }

    console.log('Your files are available at:', imagesUrls)

    // const newImages = await Promise.all(
    //   req.files.map(async (file, index) => {
    //     // const fileName = `${Date.now()}-photo${index}.jpeg`
    //     await sharp(file.buffer)
    //       .toFormat('jpeg')
    //       .jpeg({ quality: 50 })
    //       .toBuffer()
    //     return fileName
    //   })
    // )

    const GcImages = await Promise.all(
      req.files.map(async (image, index) => {
        const newFile = image.buffer
        let destFileName = `users/${userId}/${Date.now()}_image${index}.jpeg`

        // await bucket.upload(newFile, {
        //   destination: destFileName,
        // })

        // const { filename, buffer } = image
        const fileHandle = bucket.file(destFileName) //where the file will be stored.
        const [fileExists] = await fileHandle.exists()
        if (!fileExists) {
          await fileHandle.save(newFile)
          return fileHandle.publicUrl()
        }

        // const file = await bucket.file(destFileName).save(newFile)
        // .then(() => file.publicUrl())

        // const content = file.publicUrl()

        // return content
      })
    )

    // console.log('is this my new images array?', GcImages)

    // let data = JSON.parse(req.body.data)

    // data = data.images = GcImages

    // console.log('is my array getting updated bro?', data)

    // const blob = bucket.file(`userId/${userId}/image${index}.jpg`)
    // const blobStream = blob.createWriteStream({ resumable: false })
    // blobStream.on('error', (err) => {
    //   next(
    //     ApiError.badRequest({
    //       message: 'Something bad with the files happend',
    //       error: err.message,
    //     })
    //   )
    // })
    // blobStream.on('finish', async (data) => {
    //   const publicUrl = await data.publicUrl()
    //   req.body.data.images.push(publicUrl)
    // })
    // blobStream.end(file.buffer)

    // for await (let image of newImages)

    // const newImages = await Promise.all(
    //   req.files.map(async (file, index) => {
    //     // const fileName = `${Date.now()}-photo${index}.jpeg`
    //     // await sharp(file.buffer)
    //     //   .toFormat('jpeg')
    //     //   .jpeg({ quality: 50 })
    //     //   .toFile(`./src/upload/${fileName}`)
    //     //   return fileName
    //   })
    // )

    // console.log('Are these my new images bro??', newImages)

    console.log('what about the new body man?', req.body)

    const userIDChain = param('userId')
      .exists()
      .withMessage('Please provide a user ID.')
      .isMongoId()
      .withMessage('Please provide a valid ID.')
      .run(req)

    const passwordChain = body('password')
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

    await Promise.all([
      userIDChain,
      passwordChain,
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

    const userNameExists = await searchForUserBeforeCreation({
      _id: userId,
    })

    if (isEmptyArray(userNameExists)) {
      next(ApiError.badRequest('User not found.'))
      return
    }
    next()
  } catch (err) {
    console.error(err)

    next(ApiError.badRequest('No valid request to query a specific user.'))
  }
}

export { validateUserUpdate }
