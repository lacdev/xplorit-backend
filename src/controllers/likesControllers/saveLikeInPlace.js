import { getSinglePlace } from '../../usecases/placeUsecases/getSinglePlace.js'
import { postLikeToPlace } from '../../usecases/likeUsecases/postLikeToPlace.js'

const saveLikeInPlace = async (req, res) => {
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
    res.json({
      message: 'failure',
      error: {
        err,
        description: 'Could not save like.',
        statusCode: 400,
      },
    })
  }
}

export { saveLikeInPlace }
