import { Like } from '../../models/like.model.js'

const deleteLikeFromRoute = async (id) => await Like.findByIdAndDelete(id)

export { deleteLikeFromRoute }
