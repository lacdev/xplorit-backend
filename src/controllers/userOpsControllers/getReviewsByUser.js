import { getSingleUser } from '../../usecases/userUsecases/getSingleUser.js'
import { getReviewsMadeByUser } from '../../usecases/userUsecases/getReviewsMadeByUser.js'

const getReviewsByUser = async (req, res, next) => {
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
    next({})
  }
}

export { getReviewsByUser }
