import { getSinglePlace } from '../../usecases/placeUsecases/getSinglePlace.js'

const getPlace = async (req, res, next) => {
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
    next({})
  }
}

export { getPlace }
