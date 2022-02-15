import { Like } from '../../models/like.model.js'

const getLikesMadeByUser = async (id) =>
  await Like.find({ userId: id }).populate('placeId routeId')
export { getLikesMadeByUser }
