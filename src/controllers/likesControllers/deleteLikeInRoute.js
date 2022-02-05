import { deleteLikeFromRoute } from '../../usecases/likeUsecases/deleteLikeFromRoute.js'

const deleteLikeInRoute = async (req, res, next) => {
  const { likeId } = req.params
  try {
    const deletedLike = await deleteLikeFromRoute(likeId)

    if (deletedLike) {
      res.json({
        message: 'success',
        statusCode: 204,
        data: 'Deleted like in route successfully',
      })
    }
  } catch (err) {
    console.error(err)
    next({})
  }
}

export { deleteLikeInRoute }
