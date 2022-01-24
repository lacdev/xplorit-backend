import { updateSinglePlace } from '../../usecases/placeUsecases/updateSinglePlace.js'
import { ApiError } from '../../errors/ApiError.js'

const updatePlace = async (req, res) => {
  try {
    const { id } = req.params
    const { body } = req.body

    const updatedPlace = await updateSinglePlace(id, body)

    res.json({
      message: 'success',
      payload: {
        data: updatedPlace,
        description: 'Updated place successfully',
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

export { updatePlace }
