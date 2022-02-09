import { Like } from '../../models/like.model.js'

const getLikesFromRoute = async (id) => await Like.find(id)

export { getLikesFromRoute }
