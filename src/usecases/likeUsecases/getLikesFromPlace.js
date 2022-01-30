import { Like } from '../../models/like.model.js'

const getLikesFromPlace = async (id) => {
  try {

    console.log("idIncoming: " +id)
    
    return await Like.find({placeId: id})
    .select('_id ')

  } catch (error) {
    console.error(error)
  }
}

export { getLikesFromPlace }
