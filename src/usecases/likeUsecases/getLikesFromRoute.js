import { Like } from '../../models/like.model.js'

const getLikesFromRoute = async (object) => await Like.find(object)

export { getLikesFromRoute }
