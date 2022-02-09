import { Like } from '../../models/like.model.js'

const getLikesFromPlace = async (id) => await Like.find(id)

export { getLikesFromPlace }
