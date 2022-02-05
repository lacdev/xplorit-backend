import { deleteLikeFromPlace } from '../../usecases/likeUsecases/deleteLikeFromPlace.js'

const deleteLikeInPlace = async (req, res, next) => {
  const { likeId } = req.params
  try {
    const deletedLike = await deleteLikeFromPlace(likeId)

    if (deletedLike) {
      res.json({
        message: 'success',
        statusCode: 204,
        data: 'Deleted like in place successfully',
      })
    }
  } catch (err) {
    console.error(err)
    next({})
  }
}

export { deleteLikeInPlace }
