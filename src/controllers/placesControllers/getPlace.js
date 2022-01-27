import { getSinglePlace } from '../../usecases/placeUsecases/getSinglePlace.js'
import { ApiError } from '../../errors/ApiError.js'

const getPlace = async (req, res) => {
  const { placeId } = req.params

  try {
    const singlePlace = await getSinglePlace(placeId)

    res.json({
      message: 'success',
      payload: {
        data: singlePlace,
        description: 'Place found',
        statusCode: 200,
      },
    })
  } catch (err) {
    console.error(err)
    res.json({
      message: 'failure',
      error: {
        err,
        description: 'Place not found.',
        statusCode: 404,
      },
    })
  }
}

export { getPlace }
