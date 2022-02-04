import { deleteLikeFromPlace } from '../../usecases/likeUsecases/deleteLikeFromPlace.js'


const deleteLikeInPlace = async (req, res, next) => {
  const { likeId  } = req.params
  try {
   
    const deletedLike = await deleteLikeFromPlace(likeId)

    if (deletedLike) {
      res.json({
        message: 'success',
        payload: {
          data: 'No content',
          description: 'Deleted like successfully',
          statusCode: 204,
        },
      })
    }
  } catch (err) {
    console.error(err)
    next({})
  }
}

export { deleteLikeInPlace }