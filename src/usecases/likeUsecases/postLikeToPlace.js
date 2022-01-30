import { Like } from '../../models/like.model.js'

const postLikeToPlace = async (userId, idPlace) => {
  try {
   
    const newLike = new Like ({
      like : 1,
      userId : userId,
      placeId : idPlace
    })
    
    return await Like.create( newLike)

  } catch (error) {
    console.error(error)
  }
}
export { postLikeToPlace }
