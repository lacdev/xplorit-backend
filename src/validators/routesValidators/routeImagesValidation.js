import { ApiError } from '../../errors/ApiError.js'
import { isEmptyArray } from '../../utils/checkForEmptyArray.js'
import { variables } from '../../config/config.js'
import { Storage } from '@google-cloud/storage'

const validateRouteImages = async (req, res, next) => {
  try {
    console.log('Is my route getting the images?', req.files)
    console.log('Is my route getting the body?', JSON.parse(req.body.data))

    const typesAllowed = ['image/jpeg', 'image/png']

    if (!isEmptyArray(req.files)) {
      for (let image of req.files) {
        console.log('Are these my buffers bro?', image.buffer)
        if (typesAllowed.indexOf(image.mimetype) === -1) {
          next(
            ApiError.badRequest(
              'Only images of type png and jpeg are allowed with a maximum size of 2mb.'
            )
          )
          return
        } else {
          console.log('your images are allowed sir continue.')
        }
      }
    }

    const storage = new Storage({
      keyFile: process.env.GCP_SECRET,
    })

    const bucket = storage.bucket(variables.GCP_BUCKET) //Name of the bucket

    const GcImages = await Promise.all(
      req.files.map(async (image, index) => {
        const newFile = image.buffer

        let destFileName = `routes/${Date.now()}route_image${index}.jpeg`

        const fileHandle = bucket.file(destFileName) //where the file will be stored.

        const [fileExists] = await fileHandle.exists()

        if (!fileExists) {
          await fileHandle.save(newFile)
          return fileHandle.publicUrl()
        }
      })
    )

    // await bucket.upload(newFile, {
    //   destination: destFileName,
    // })

    console.log('is this my new routes images array?', GcImages)

    next()
  } catch (e) {
    next(
      ApiError.internalError(
        'Something bad while uploading the images happened.'
      )
    )
  }
}

export { validateRouteImages }
