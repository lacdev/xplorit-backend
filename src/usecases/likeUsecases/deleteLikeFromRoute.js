import { Like } from '../../models/like.model.js'

const deleteLikeFromRoute = async (query) => await Like.findOneAndDelete(query)

export { deleteLikeFromRoute }
