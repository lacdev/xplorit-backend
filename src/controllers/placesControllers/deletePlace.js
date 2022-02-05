import { deleteSinglePlace } from '../../usecases/placeUsecases/deleteSinglePlace.js'

const deletePlace = async (req, res, next) => {
  try {
    const { placeId } = req.params

    const deletedPlace = await deleteSinglePlace(placeId)

    if (deletedPlace) {
      res.json({
        message: 'success',
        statusCode: 204,
        data: 'Deleted place successfully',
      })
    }
  } catch (err) {
    console.error(err)
    next({})
  }
}

export { deletePlace }
