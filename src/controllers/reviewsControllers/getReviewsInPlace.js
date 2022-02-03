import { getAllReviewsFromPlace } from '../../usecases/reviewUsecases/getAllReviewsFromPlace.js'

const getReviewsInPlace = async (req, res, next) => {
  const { placeId } = req.params

  try {
    const allReviewsInPlace = await getAllReviewsFromPlace({ placeId: placeId })

    res.json({
      message: 'Reviews for this place found successfully',
      statusCode: 200,
      data: allReviewsInPlace,
    })
  } catch (err) {
    console.log(err)

    next({})
  }
}

export { getReviewsInPlace }
