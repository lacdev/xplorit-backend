import { Like } from '../../models/like.model.js'

const deleteLikeFromPlace = async (id) => await Like.findByIdAndDelete(id)

export { deleteLikeFromPlace }
