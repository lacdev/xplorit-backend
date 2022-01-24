import { getSingleUser } from '../../usecases/userUsecases/getSingleUser.js'
import { getLikesMadeByUser } from '../../usecases/userUsecases/getLikesMadeByUser.js'
import { ApiError } from '../../errors/ApiError.js'

const getLikesByUser = async (req, res) => {
  const { userId } = req.params

  try {
    const foundUser = await getSingleUser(userId)

    const likesByUser = getLikesMadeByUser(foundUser._id)

    res.json({
      message: 'success',
      payload: {
        data: likesByUser,
        statusCode: 200,
      },
    })
  } catch (err) {
    console.error(err)
    res.json({
      message: 'failure',
      error: {
        err,
        description: 'User not found.',
        statusCode: 404,
      },
    })
  }
}

export { getLikesByUser }
