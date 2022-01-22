import { User } from 'models/user.model'
import { Like } from 'models/like.model'

const getLikesMadeByUser = async (id) => await User.findById(id)

export { getLikesMadeByUser }
