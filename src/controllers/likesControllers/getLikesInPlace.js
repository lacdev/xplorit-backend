import { getSinglePlace } from '../../usecases/placeUsecases/getSinglePlace.js'
import { getLikesFromPlace } from '../../usecases/likeUsecases/getLikesFromPlace.js'

const getLikesInPlace = async (req, res) => {
  const { placeId } = req.params

  try {
    const foundPlace = await getSinglePlace(placeId)

    const allLikesInPlace = await getLikesFromPlace(foundPlace._id)

    res.json({
      message: 'success',
      payload: {
        data: allLikesInPlace,
        description: 'Likes found successfully',
        statusCode: 200,
      },
    })
  } catch (err) {
    console.log(err)

    res.json({
      message: 'failure',
      error: {
        err,
        description: 'Could not get likes.',
        statusCode: 404,
      },
    })
  }
}

export { getLikesInPlace }
