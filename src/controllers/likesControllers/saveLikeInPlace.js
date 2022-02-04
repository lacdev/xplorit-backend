import { postLikeToPlace } from '../../usecases/likeUsecases/postLikeToPlace.js'

const saveLikeInPlace = async (req, res, next) => {
  const { placeId} = req.params
  const { userId } = req.body
  
  try {
    const savedLike = await postLikeToPlace({placeId:placeId, userId:userId})

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
