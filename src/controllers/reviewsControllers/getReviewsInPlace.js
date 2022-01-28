import { getAllReviewsFromPlace } from '../../usecases/reviewUsecases/getAllReviewsFromPlace.js'
import { getSinglePlace } from '../../usecases/placeUsecases/getSinglePlace.js'

const getReviewsInPlace = async (req, res, next) => {
  const { placeId } = req.params

  try {
    const foundPlace = await getSinglePlace(placeId)

    const allReviewsInPlace = await getAllReviewsFromPlace(foundPlace._id)

    res.json({
      message: 'success',
      payload: {
        data: allReviewsInPlace,
        description: 'Reviews found successfully',
        statusCode: 200,
      },
    })
  } catch (err) {
    console.log(err)

    next({})
  }
}

export { getReviewsInPlace }
