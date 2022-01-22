import { User } from '../../models/user.model.js'

const getReviewsMadeByUser = async (id) => await User.findById(id)

export { getReviewsMadeByUser }
