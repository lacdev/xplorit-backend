import { Like } from '../../models/like.model.js'

const postLikeToPlace = async (userId, placeId) => {
  try {
    const newLike = new Like ({
      userId : userId,
      placeId : placeId
    })
    
    return await Like.create( newLike)

  } catch (error) {
    console.error(error)
  }
}
export { postLikeToPlace }
