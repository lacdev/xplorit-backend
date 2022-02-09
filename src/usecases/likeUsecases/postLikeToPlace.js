import { Like } from '../../models/like.model.js'

const postLikeToPlace = async (newLike) => await Like.create(newLike)

export { postLikeToPlace }
