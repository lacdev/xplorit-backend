import { ApiError } from '../../errors/ApiError.js'
import { uploadImages } from '../../utils/uploadImages.js'
import { compressImages } from '../../utils/compressImages.js'

const validatePlaceImages = async (req, res, next) => {
  try {
    if (!req.files) {
      next(ApiError.badRequest('No images to upload were found.'))
    }

    const typesAllowed = ['image/jpeg', 'image/png']

    for (let image of req.files) {
      if (typesAllowed.indexOf(image.mimetype) === -1) {
        next(
          ApiError.badRequest(
            'Only images of type png and jpeg are allowed with a maximum size of 2mb.'
          )
        )
        return
      }
    }

    // const imagesCompressed = await compressImages(req.files)

    // const imagesUrls = await uploadImages('place', imagesCompressed)

    // const newBody = JSON.parse(req.body.data)
    // newBody.images = imagesUrls
    // req.body = newBody

    const undefinedImages = [undefined, undefined]

    const newBody = JSON.parse(req.body.data)
    newBody.images = undefinedImages
    req.body = newBody

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
