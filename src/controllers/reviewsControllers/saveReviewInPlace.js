import { postReviewToPlace } from '../../usecases/reviewUsecases/postReviewToPlace.js'

const saveReviewInPlace = async (req, res, next) => {
  try {
    const { placeId } = req.params
    const newReview = req.body

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
