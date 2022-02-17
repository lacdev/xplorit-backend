import { getSingleUser } from '../../usecases/userUsecases/getSingleUser.js'
import { ApiError } from '../../errors/ApiError.js'
import { compressImage } from '../../utils/compressImage.js'
import { uploadImage } from '../../utils/uploadImage.js'
import validator from 'express-validator'
const { param, validationResult } = validator

const validateCoverUpdate = async (req, res, next) => {
  try {
    const { userId } = req.params

    // const { id } = req.user

    //Validate payload equals to the user in the database they need to match.
    //Otherwise throw an error.

    // const foundUser = await getSingleUser({ _id: id })

    const userIDChain = param('userId')
      .exists()
      .withMessage('Please provide a user ID.')
      .isMongoId()
      .withMessage('Please provide a valid ID.')
      .run(req)

    await userIDChain

    const result = validationResult(req)

    if (!result.isEmpty()) {
      next(
        ApiError.badRequest({ message: 'Bad Request', errors: result.array() })
      )
      return
    }

    // const foundUser = await getSingleUser({ _id: id })

    const userExists = await getSingleUser({
      _id: userId,
    })

    if (!userExists) {
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

    const imageUrl = await uploadImage(userId, 'cover', compressedImage)

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
