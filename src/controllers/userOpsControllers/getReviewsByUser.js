import { getSingleUser } from '../../usecases/userUsecases/getSingleUser.js'
import { getReviewsMadeByUser } from '../../usecases/userUsecases/getReviewsMadeByUser.js'
import { ApiError } from '../../errors/ApiError.js'

const getReviewsByUser = async (req, res) => {
  const { userId } = req.params

  try {
    const foundUser = await getSingleUser(userId)

    const reviewsByUser = getReviewsMadeByUser(foundUser._id)

    res.json({
      message: 'success',
      payload: {
        data: reviewsByUser,
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

export { getReviewsByUser }
