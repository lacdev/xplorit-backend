import { getSinglePlace } from '../../usecases/placeUsecases/getSinglePlace.js'
import { postLikeToPlace } from '../../usecases/likeUsecases/postLikeToPlace.js'
import { getSingleUser } from '../../usecases/userUsecases/getSingleUser.js'

const saveLikeInPlace = async (req, res, next) => {
  const { placeId } = req.params
  const { userId  } = req.body

  try {

    const foundPlace = await getSinglePlace(placeId)
    
    const getId = foundPlace.map((data) => {
      const objectId = data._id 
      return objectId })
    const idPlace = getId[0]
    
    const foundUser = await getSingleUser(userId)
    const foundUserId = foundUser[0]._id

    const savedLike = await postLikeToPlace(foundUserId, idPlace)

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
