import { ApiError } from '../../errors/ApiError.js'
import { isEmptyArray } from '../../utils/checkForEmptyArray.js'
import { variables } from '../../config/config.js'
import { Storage } from '@google-cloud/storage'
import { v4 } from 'uuid'

const validatePlaceImages = async (req, res, next) => {
  try {
    console.log('Is my place getting the images?', req.files)
    console.log('Is my place getting the body?', JSON.parse(req.body.data))

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
        }
      }
    }

    const storage = new Storage({
      keyFile: process.env.GCP_SECRET,
    })

    const bucket = storage.bucket(variables.GCP_BUCKET) //Name of the bucket

    const uniqueIdentifier = v4()

    const GcImages = await Promise.all(
      req.files.map(async (image, index) => {
        const newFile = image.buffer
        let destFileName = `places/place-id-${uniqueIdentifier}/place_image${
          index + 1
        }.jpeg`

        const fileHandle = bucket.file(destFileName) //where the file will be stored.

        const [fileExists] = await fileHandle.exists()

        if (!fileExists) {
          await fileHandle.save(newFile)
          return fileHandle.publicUrl()
        }
      })
    )

    console.log('is this my new places images array?', GcImages)

    //Modify the body with the array and pass the request to the next middleware

    //Modify the body with the array and pass the request to the next middleware
    //Serializes data JSON not modified original data.
    const newBody = JSON.parse(req.body.data)
    //adds new key called images to the new body which will contain all the URLs.
    newBody.images = GcImages
    //req.body is now equal to the new body.
    req.body = newBody

    console.log('was my body updated bro???', req.body)
    //Parse body, for each key in body create a new object,
    //then add the new key named images which will be equal to the gcImages array.

    next()
  } catch (e) {
    next(
      ApiError.internalError(
        'Something bad while uploading the images happened.'
      )
    )
  }
}

export { validatePlaceImages }
