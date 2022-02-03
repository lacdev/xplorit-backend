import { deleteLikeFromRoute } from '../../usecases/likeUsecases/deleteLikeFromRoute.js'


const deleteLikeInRoute = async (req, res, next) => {
  const { likeId  } = req.params
  try {
   
    const deletedLike = await deleteLikeFromRoute(likeId)

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

export { deleteLikeInRoute }