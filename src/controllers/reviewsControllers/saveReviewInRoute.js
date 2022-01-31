import { postReviewToRoute } from '../../usecases/reviewUsecases/postReviewToRoute.js'
import { getSingleUser } from '../../usecases/userUsecases/getSingleUser.js'

const saveReviewInRoute = async (req, res, next) => {
  const { routeId } = req.params
  const newReview = req.body
  const { userId } = newReview

  try {
    const foundUser = await getSingleUser(userId)

    console.log('User found:', foundUser)
    console.log('Place Id found:', routeId)

    // newReview.avatar = foundUser.avatar
    // newReview.username = foundUser.username
    newReview.routeId = routeId

    const savedReview = await postReviewToRoute(newReview)

    if (savedReview) {
      res.json({
        description: 'Review created in the route successfully',
        statusCode: 200,
      })
    }
  } catch (err) {
    console.error(err)
    next({})
  }
}

export { saveReviewInRoute }
