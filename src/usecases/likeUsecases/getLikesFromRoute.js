import { Like } from '../../models/like.model.js'

const getLikesFromRoute = async (query) => await Like.find(query)

export { getLikesFromRoute }
