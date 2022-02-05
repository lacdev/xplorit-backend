import { postLikeToPlace } from '../../usecases/likeUsecases/postLikeToPlace.js'

const saveLikeInPlace = async (req, res, next) => {
  const { placeId } = req.params
  const { userId } = req.body

  try {
    const savedLike = await postLikeToPlace({
      placeId: placeId,
      userId: userId,
    })

    if (savedLike) {
      res.json({
        message: 'success',
        statusCode: 200,
        data: 'Like saved in place successfully',
      })
    }
  } catch (err) {
    console.error(err)
    next({})
  }
}

export { saveLikeInPlace }
