import { getSinglePlace } from '../../usecases/placeUsecases/getSinglePlace.js'
import { getLikesFromPlace } from '../../usecases/likeUsecases/getLikesFromPlace.js'

const getLikesInPlace = async (req, res, next) => {
  const { placeId } = req.params

  try {
    
    const foundPlace = await getSinglePlace(placeId)
  
    const getId = foundPlace.map((data) => {
      const objectId = data._id 
      return objectId })
    const idPlace = getId[0]

    const allLikesInPlace = await getLikesFromPlace(idPlace)

    const totalLikesInPlace = allLikesInPlace.length <= 0 ? 0 : allLikesInPlace.reduce((accum, current) => {
      return accum + current.like
    },0)

    res.json({
      message: 'success',
      payload: {
        data: totalLikesInPlace,
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
