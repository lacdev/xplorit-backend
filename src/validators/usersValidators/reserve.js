// import { ApiError } from '../../errors/ApiError.js'
// import validator from 'express-validator'
// const { param, body, validationResult } = validator
// import { searchForUserBeforeCreation } from '../../usecases/userUsecases/searchUserBeforeCreation.js'
// import { isEmptyArray } from '../../utils/checkForEmptyArray.js'
// import multer from 'multer'

// // import sharp from 'sharp'
// // import { Buffer } from 'buffer'
// import { variables } from '../../config/config.js'
// import { Storage } from '@google-cloud/storage'
// // import S3 from 'aws-sdk'

// // const upload = multer()
// const maxSize = 0.2 * 1024 * 1024

// // const userImagesUpdate = multer({
// //   storage: multer.memoryStorage(),
// //   limits: { fileSize: maxSize },
// // }).array('images', 2)

// multer({
//   storage: multer.memoryStorage(),
//   limits: { fileSize: maxSize },
// }).single('cover')

// // .array('images', 2)

// // import { S3Client } from '@aws-sdk/client-s3'

// // const s3 = S3Client({
// //   region: process.env.AWS_BUCKET_REGION,
// //   accessKeyId: process.env.AWS_ACCESS_KEY,
// //   secretAccessKey: process.env.SECRET_ACCESS_KEY,
// // })

// const validateUserUpdate = async (req, res, next) => {
//   try {
//     const { userId } = req.params

//     console.log(' are my files here?', req.files)

//     // console.log('Is my body parsed here bro?', JSON.parse(req.body.data))

//     const typesAllowed = ['image/jpeg', 'image/png']

//     if (!isEmptyArray(req.files)) {
//       for (let image of req.files) {
//         console.log(' are these my buffers bro?', image.buffer)
//         if (typesAllowed.indexOf(image.mimetype) === -1) {
//           next(
//             ApiError.badRequest(
//               'Only images of type png and jpeg are allowed with a maximum size of 256kb.'
//             )
//           )
//           return
//         } else {
//           console.log('your images are allowed sir continue.')
//         }
//       }
//     }

//     //     new Storage({
//     //       projectId: process.env.GOOGLE_STORAGE_PROJECT_ID,
//     //       scopes: 'https://www.googleapis.com/auth/cloud-platform',
//     //       credentials: {
//     //         client_email: process.env.GOOGLE_STORAGE_EMAIL,
//     //         private_key: process.env.GOOGLE_STORAGE_PRIVATE_KEY
//     //       }
//     // })
//     // const storage = new Storage({
//     //   projectId: variables.GCP_PROJECT_ID,
//     //   scopes: 'https://www.googleapis.com/auth/cloud-platform',
//     //   credentials: {
//     //     client_email: variables.GCP_CLIENT_EMAIL,
//     //     private_key: variables.GCP_PRIVATE_KEY,
//     //   },
//     // })

//     const storage = new Storage({
//       // keyFilename: JSON.parse(process.env.GCP_SECRET),
//       keyFile: process.env.GCP_SECRET,
//     })

//     const bucket = storage.bucket(variables.GCP_BUCKET)

//     const imagesUrls = []

//     // for await (let [image, index] of req.files) {
//     //   const newFile = image.buffer
//     //   const file = bucket.file(
//     //     `users/${userId}/${Date.now()}-image${index}.jpg`
//     //   )
//     //   await file.save(newFile).then(() => {
//     //     const content = file.publicUrl()
//     //     // const publicUrl = `https://storage.googleapis.com/xplorit-images/${file}`
//     //     imagesUrls.push(content)
//     //   })
//     // }

//     console.log('Your files are available at:', imagesUrls)

//     // const newImages = await Promise.all(
//     //   req.files.map(async (file, index) => {
//     //     // const fileName = `${Date.now()}-photo${index}.jpeg`
//     //     await sharp(file.buffer)
//     //       .toFormat('jpeg')
//     //       .jpeg({ quality: 50 })
//     //       .toBuffer()
//     //     return fileName
//     //   })
//     // )

//     const GcImages = await Promise.all(
//       req.files.map(async (image, index) => {
//         const newFile = image.buffer
//         let destFileName = `users/${userId}/${Date.now()}_image${index}.jpeg`

//         // await bucket.upload(newFile, {
//         //   destination: destFileName,
//         // })

//         // const { filename, buffer } = image
//         const fileHandle = bucket.file(destFileName) //where the file will be stored.
//         const [fileExists] = await fileHandle.exists()
//         if (!fileExists) {
//           await fileHandle.save(newFile)
//           return fileHandle.publicUrl()
//         }
//       })
//     )

//     console.log('is this my new images array?', GcImages)

//     // let data = JSON.parse(req.body.data)

//     const updatedBody = {
//       coverPhoto: GcImages[0],
//     }

//     req.body = updatedBody

//     next()

//     // data = data.images = GcImages

//     // console.log('is my array getting updated bro?', data)

//     // const blob = bucket.file(`userId/${userId}/image${index}.jpg`)
//     // const blobStream = blob.createWriteStream({ resumable: false })
//     // blobStream.on('error', (err) => {
//     //   next(
//     //     ApiError.badRequest({
//     //       message: 'Something bad with the files happend',
//     //       error: err.message,
//     //     })
//     //   )
//     // })
//     // blobStream.on('finish', async (data) => {
//     //   const publicUrl = await data.publicUrl()
//     //   req.body.data.images.push(publicUrl)
//     // })
//     // blobStream.end(file.buffer)

//     // for await (let image of newImages)

//     // const newImages = await Promise.all(
//     //   req.files.map(async (file, index) => {
//     //     // const fileName = `${Date.now()}-photo${index}.jpeg`
//     //     // await sharp(file.buffer)
//     //     //   .toFormat('jpeg')
//     //     //   .jpeg({ quality: 50 })
//     //     //   .toFile(`./src/upload/${fileName}`)
//     //     //   return fileName
//     //   })
//     // )

//     // console.log('Are these my new images bro??', newImages)

//     console.log('what about the new body man?', req.body)

//     const userIDChain = param('userId')
//       .exists()
//       .withMessage('Please provide a user ID.')
//       .isMongoId()
//       .withMessage('Please provide a valid ID.')
//       .run(req)

//     // const passwordChain = body('password')
//     //   .exists({ checkFalsy: true, checkNull: true })
//     //   .withMessage(
//     //     'Password is required and must be at least 8 characters and should contain a number.'
//     //   )
//     //   .not()
//     //   .isEmpty()
//     //   .isLength({ min: 8 })
//     //   .withMessage(
//     //     'Password needs to be at least 8 Characters and should contain at least 1 number.'
//     //   )
//     //   .matches(/\d/)
//     //   .withMessage('must contain a number')
//     //   .run(req)

//     // // const avatarChain = body('avatar')
//     // //   .optional()
//     // //   .isURL()
//     // //   .withMessage('Please provide a valid avatar URL')
//     // //   .trim()
//     // //   .escape()
//     // //   .run(req)

//     // // const coverPhotoChain = body('coverPhoto')
//     // //   .optional()
//     // //   .isURL()
//     // //   .withMessage('Please provide a valid cover photo URL')
//     // //   .trim()
//     // //   .escape()
//     // //   .run(req)

//     // await Promise.all([
//     //   userIDChain,
//     //   passwordChain,
//     //   // avatarChain,
//     //   // coverPhotoChain,
//     // ])

//     await userIDChain

//     const result = validationResult(req)

//     if (!result.isEmpty()) {
//       next(
//         ApiError.badRequest({ message: 'Bad Request', errors: result.array() })
//       )
//       return
//     }

//     const userNameExists = await searchForUserBeforeCreation({
//       _id: userId,
//     })

//     if (isEmptyArray(userNameExists)) {
//       next(ApiError.badRequest('User not found.'))
//       return
//     }

//     next()
//   } catch (err) {
//     console.error(err)

//     next(ApiError.badRequest('No valid request to query a specific user.'))
//   }
// }

// export { validateUserUpdate }

// const imagesUrls = []

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

// console.log('Your files are available at:', imagesUrls)

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

// new Storage({
//   projectId: process.env.GOOGLE_STORAGE_PROJECT_ID,
//   scopes: 'https://www.googleapis.com/auth/cloud-platform',
//   credentials: {
//     client_email: process.env.GOOGLE_STORAGE_EMAIL,
//     private_key: process.env.GOOGLE_STORAGE_PRIVATE_KEY,
//   },
// })
// const storage = new Storage({
//   projectId: variables.GCP_PROJECT_ID,
//   scopes: 'https://www.googleapis.com/auth/cloud-platform',
//   credentials: {
//     client_email: variables.GCP_CLIENT_EMAIL,
//     private_key: variables.GCP_PRIVATE_KEY,
//   },
// })

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

// const userImages = multer({
//   storage: multer.memoryStorage(),
//   limits: { fileSize: maxSize },
// }).array('images', 6)

// const handleImagesUpload = async (req, res, next) => {
//     try {
//       if (!req.body.images) {
//         next(ApiError.badRequest('No images found to be uploaded.'))
//       }

//       const bucket = storage.bucket(variables.GCP_BUCKET)

//       const uploadImages = async (id, images) => {
//         try {
//           const unresolvedPromises = images.map((image, index) => {
//             let matches = image.match(/^data:([A-Za-z-+/]+);base64,(.+)$/)

//             if (matches.length !== 3) {
//               return new Error('Invalid input string')
//             }

//             const buffer = Buffer.from(matches[2], 'base64')

//             const file = bucket.file(`places/${id}/image${index}.jpg`)

//             file
//               .save(buffer)
//               .then(() => {
//                 let content = file.publicUrl()
//                 return content
//               })
//               .catch((e) => console.error(e))
//           })

//           return await Promise.all(unresolvedPromises)
//           // return await Promise.all(results)
//         } catch (e) {
//           console.error(e)
//         }
//       }

//       // console.log('Log the body pls', req.body)
//       // const buffersArray = []

//       const { ownerId } = req.body

//       const newImages = await uploadImages(ownerId, req.body.images)

//       req.body.images = newImages

//       // const publicUrl = `https://storage.googleapis.com/xplorit-images/${file}`
//       // buffersArray.push(content)
//       // console.log('Your files are available at:', buffersArray)

//       console.log('new images???', newImages)

//       // .then(async () => {
//       //   const newImages = await mutateImagesArray(
//       //     req.body.images,
//       //     buffersArray
//       //   )
//       //   req.body.images = newImages
//       // })

//       // const newArray = await mutateImagesArray(req.body.images, buffersArray)

//       // req.body.images = newArray

//       next()
//     } catch (e) {
//       next({})
//     }
//   }

//   export { handleImagesUpload }
