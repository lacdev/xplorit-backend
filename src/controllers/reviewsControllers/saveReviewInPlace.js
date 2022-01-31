import { postReviewToPlace } from '../../usecases/reviewUsecases/postReviewToPlace.js'
import { getSingleUser } from '../../usecases/userUsecases/getSingleUser.js'

const saveReviewInPlace = async (req, res, next) => {
  const { placeId } = req.params
  const newReview = req.body
  const { userId } = newReview

  try {
    const foundUser = await getSingleUser(userId)

    console.log('User found:', foundUser)
    console.log('Place Id found:', placeId)

    // newReview.avatar = foundUser.avatar
    // newReview.username = foundUser.username
    newReview.placeId = placeId

    const savedReview = await postReviewToPlace(newReview)

    if (savedReview) {
      res.json({
        description: 'Review created in the place successfully',
        statusCode: 200,
      })
    }
  } catch (err) {
    console.error(err)
    next({})
  }
}

export { saveReviewInPlace }
