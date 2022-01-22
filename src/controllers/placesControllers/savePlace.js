import { createSinglePlace } from '../../usecases/placeUsecases/createSinglePlace.js'

const savePlace = async (req, res) => {
  try {
    const { newPlace } = req.body

    const savedPlace = await createSinglePlace(newPlace)

    res.json({
      message: 'success',
      payload: {
        data: savedPlace,
        description: 'Place created successfully',
        statusCode: 200,
      },
    })
  } catch (err) {
    console.error(err)
    res.json({
      message: 'failure',
      error: {
        err,
        description: 'Could not create place.',
        statusCode: 400,
      },
    })
  }
}

export { savePlace }
