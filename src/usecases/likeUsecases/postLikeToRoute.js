import { Like } from '../../models/like.model.js'

const postLikeToRoute = async (newLike) => await Like.create(newLike)

export { postLikeToRoute }
