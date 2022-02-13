import { getLikesMadeByUser } from '../../usecases/userUsecases/getLikesMadeByUser.js'
import { ApiError } from '../../errors/ApiError.js'
import { isEmptyArray } from '../../utils/checkForEmptyArray.js'

const getLikesByUser = async (req, res, next) => {
  try {
    const { userId } = req.params

    const likesByUser = await getLikesMadeByUser(userId)

    if (isEmptyArray(likesByUser)) {
      next(ApiError.notFound('No likes by this user were found.'))
      return
    }

    res.json({
      message: 'success',
      statusCode: 200,
      data: likesByUser,
    })
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

export { getLikesByUser }
