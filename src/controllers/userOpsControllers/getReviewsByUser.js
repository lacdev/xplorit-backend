import { getReviewsMadeByUser } from '../../usecases/userUsecases/getReviewsMadeByUser.js'

const getReviewsByUser = async (req, res, next) => {
  const { userId } = req.params

  try {
    const reviewsByUser = getReviewsMadeByUser(userId)

    res.json({
      message: 'success',
      statusCode: 200,
      data: reviewsByUser,
    })
  } catch (err) {
    console.error(err)
    next({})
  }
}

export { getReviewsByUser }
