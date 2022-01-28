import { deleteSinglePlace } from '../../usecases/placeUsecases/deleteSinglePlace.js'

const deletePlace = async (req, res, next) => {
  try {
    const { id } = req.params

    const deletedPlace = await deleteSinglePlace(id)

    if (deletedPlace) {
      res.json({
        message: 'success',
        payload: {
          data: 'No content',
          description: 'Deleted place successfully',
          statusCode: 204,
        },
      })
    }
  } catch (err) {
    console.error(err)
    next({})
  }
}

export { deletePlace }
