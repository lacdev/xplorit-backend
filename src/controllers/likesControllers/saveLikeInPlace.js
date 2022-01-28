import { getSinglePlace } from '../../usecases/placeUsecases/getSinglePlace.js'
import { postLikeToPlace } from '../../usecases/likeUsecases/postLikeToPlace.js'

const saveLikeInPlace = async (req, res, next) => {
  const { placeId } = req.params
  const { newLike } = req.body

  try {
    const foundRoute = await getSinglePlace(placeId)

    const savedLike = await postLikeToPlace(foundRoute._id, newLike)

    res.json({
      message: 'success',
      payload: {
        data: savedLike,
        description: 'Like created successfully',
        statusCode: 200,
      },
    })
  } catch (err) {
    console.error(err)
    next({})
  }
}

export { saveLikeInPlace }
