import { createSinglePlace } from '../../usecases/placeUsecases/createSinglePlace.js'

const savePlace = async (req, res, next) => {
  try {
    const newPlace = req.body

    const savedPlace = await createSinglePlace(newPlace)
    console.log(savedPlace)

    res.json({
      message: 'success',
      statusCode: 200,
      description: 'Place created successfully',
    })

    if (savedPlace) {
      res.json({
        message: 'success',
        payload: {
          data: savedPlace,
          description: 'Place created successfully',
          statusCode: 200,
        },
      })
    }
  } catch (err) {
    console.error(err)
    next({})
  }
}

export { savePlace }
