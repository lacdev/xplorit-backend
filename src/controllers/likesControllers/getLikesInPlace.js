import { getSinglePlace } from '../../usecases/placeUsecases/getSinglePlace.js'
import { getLikesFromPlace } from '../../usecases/likeUsecases/getLikesFromPlace.js'
import mongoose from 'mongoose'

const getLikesInPlace = async (req, res, next) => {
  const { placeId, likeId } = req.params

  try {

    const newPlaceId = mongoose.Types.ObjectId(placeId);
    
    const foundPlace = await getSinglePlace(newPlaceId)

    console.log(foundPlace._id)
    const allLikesInPlace = await getLikesFromPlace(foundPlace._id,likeId)
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
