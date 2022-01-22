import { User } from '../../models/user.model.js'

const getLikesMadeByUser = async (id) => await User.findById(id)

export { getLikesMadeByUser }
