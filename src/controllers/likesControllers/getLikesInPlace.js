import { getSinglePlace } from '../../usecases/placeUsecases/getSinglePlace.js'
import { getLikesFromPlace } from '../../usecases/likeUsecases/getLikesFromPlace.js'

const getLikesInPlace = async (req, res, next) => {
  const { placeId } = req.params

  try {
    
    const foundPlace = await getSinglePlace(placeId)

    const id= foundPlace.placeId
    console.log(id)
    const allLikesInPlace = await getLikesFromPlace(foundPlace.placeId)
    console.log(allLikesInPlace)
    
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

    next({})
  }
}

export { getLikesInPlace }
