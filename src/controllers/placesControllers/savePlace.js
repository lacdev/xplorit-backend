import { createSinglePlace } from '../../usecases/placeUsecases/createSinglePlace.js'

const savePlace = async (req, res, next) => {
  try {
    const newPlace = req.body

    const savedPlace = await createSinglePlace(newPlace)

    if (savedPlace) {
      res.json({
        message: 'success',
        statusCode: 200,
        description: 'Place created successfully',
      })
    }
  } catch (err) {
    console.error(err)
    next({})
  }
}

export { savePlace }
