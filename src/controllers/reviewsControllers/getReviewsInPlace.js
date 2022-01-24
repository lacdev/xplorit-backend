import { getAllReviewsFromPlace } from '../../usecases/reviewUsecases/getAllReviewsFromPlace.js'
import { getSinglePlace } from '../../usecases/placeUsecases/getSinglePlace.js'
import { ApiError } from '../../errors/ApiError.js'

const getReviewsInPlace = async (req, res) => {
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

    res.json({
      message: 'failure',
      error: {
        err,
        description: 'Could not get reviews.',
        statusCode: 404,
      },
    })
  }
}

export { getReviewsInPlace }
