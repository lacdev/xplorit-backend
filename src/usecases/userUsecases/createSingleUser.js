import { User } from '../../models/user.model.js'

const createSingleUser = async (user) => await User.create(user)

export { createSingleUser }
