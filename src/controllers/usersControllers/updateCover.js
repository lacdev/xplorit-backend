import { updateSingleUser } from '../../usecases/userUsecases/updateSingleUser.js'
import { ApiError } from '../../errors/ApiError.js'

const updateCover = async (req, res, next) => {
  try {
    // const { userId } = req.params
    const { cover } = req.body

    const { id } = req.user

    //Validate payload equals to the user in the database they need to match.
    //Otherwise throw an error.

    // const foundUser = await getSingleUser({ _id: id })

    const updatedUser = await updateSingleUser(id, {
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
