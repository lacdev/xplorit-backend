import { Like } from '../../models/like.model.js'

const getLikesFromPlace = async (query) => await Like.find(query)

export { getLikesFromPlace }
