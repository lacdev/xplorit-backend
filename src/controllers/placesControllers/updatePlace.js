import { updateSinglePlace } from '../../usecases/placeUsecases/updateSinglePlace.js'

const updatePlace = async (req, res, next) => {
  try {
    const { placeId } = req.params
    const body = req.body

    const updatedPlace = await updateSinglePlace(placeId, body)

    if (updatedPlace) {
      res.json({
        message: 'success',
        statusCode: 200,
        description: 'Place updated successfully',
      })
    }
  } catch (err) {
    console.error(err)
    next({})
  }
}

export { updatePlace }
