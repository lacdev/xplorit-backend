import { Like } from '../../models/like.model.js'

const getLikesFromPlace = async (object) => await Like.find(object)

export { getLikesFromPlace }
