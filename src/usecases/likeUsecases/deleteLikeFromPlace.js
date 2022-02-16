import { Like } from '../../models/like.model.js'

const deleteLikeFromPlace = async (query) => await Like.findOneAndDelete(query)

export { deleteLikeFromPlace }
