import { updateSingleUser } from '../../usecases/userUsecases/updateSingleUser.js'
import { ApiError } from '../../errors/ApiError.js'

const updateAvatar = async (req, res, next) => {
  try {
    // const { userId } = req.params
    const { avatar } = req.body

    const { id } = req.user

    //Validate payload equals to the user in the database they need to match.
    //Otherwise throw an error.

    // const foundUser = await getSingleUser({ _id: id })

    const updatedUser = await updateSingleUser(id, {
      avatar: avatar,
    })

    if (updatedUser) {
      const { avatar } = updatedUser

      res.json({
        success: true,
        statusCode: 201,
        description: 'Avatar updated successfully',
        data: avatar,
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

export { updateAvatar }
