import { getSingleUser } from '../../usecases/userUsecases/getSingleUser.js'
import { ApiError } from '../../errors/ApiError.js'
import { compressImage } from '../../utils/compressImage.js'
import { uploadImage } from '../../utils/uploadImage.js'

const validateCoverUpdate = async (req, res, next) => {
  try {
    const { id } = req.user

    const foundUser = await getSingleUser({ _id: id })

    if (!foundUser) {
      next(ApiError.notFound('User not found.'))
      return
    }

    if (!req.file) {
      next(ApiError.badRequest('No file found for upload.'))
      return
    }

    const typesAllowed = ['image/jpeg', 'image/png', 'image/webp']

    if (typesAllowed.indexOf(req.file.mimetype) === -1) {
      next(
        ApiError.badRequest(
          'Only an image of type png, jpeg and webp is allowed with a maximum size of 512kb.'
        )
      )
      return
    }

    const compressedImage = await compressImage(req.file.buffer)

    const imageUrl = await uploadImage(id, 'cover', compressedImage)

    const updatedBody = {
      cover: imageUrl,
    }

    req.body = updatedBody

    next()
  } catch (err) {
    console.error(err)
    next(ApiError.badRequest('No valid request to query a specific user.'))
  }
}

export { validateCoverUpdate }
