import { updateSingleUser } from '../../usecases/userUsecases/updateSingleUser.js'
import { ApiError } from '../../errors/ApiError.js'

const updateCover = async (req, res, next) => {
  try {
    const { userId } = req.params
    const { cover } = req.body

    const updatedUser = await updateSingleUser(userId, {
      coverPhoto: cover,
    })

    if (updatedUser) {
      const { coverPhoto } = updatedUser
      res.json({
        success: true,
        statusCode: 201,
        description: 'Cover photo updated successfully',
        data: coverPhoto,
      })
    }
  } catch (err) {
    if (err.name === 'ValidationError') {
      next(
        ApiError.badRequest({
          message: 'Validation Error',
          errors: err,
        })
      )
      return
    } else {
      console.log(err)
      next({})
    }
  }
}

export { updateCover }
