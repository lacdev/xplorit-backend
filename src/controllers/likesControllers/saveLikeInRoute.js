import { postLikeToRoute } from '../../usecases/likeUsecases/postLikeToRoute.js'
import { ApiError } from '../../errors/ApiError.js'

const saveLikeInRoute = async (req, res, next) => {
  const { routeId } = req.params
  const { userId } = req.body

  try {
    const savedLike = await postLikeToRoute({
      routeId: routeId,
      userId: userId,
    })

    if (savedLike) {
      res.json({
        message: 'success',
        statusCode: 200,
        data: 'Like saved in route successfully',
      })
    }
  } catch (err) {
    if (err.name === 'ValidationError') {
      next(
        ApiError.badRequest({
          message: 'Validation Error',
          errors: err,
        })
      )
      return
    } else {
      console.log(err)
      next({})
    }
  }
}

export { saveLikeInRoute }
