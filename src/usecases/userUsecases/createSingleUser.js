import { User } from 'models/user.model'

const createSingleUser = async (user) => await User.create(user)

export { createSingleUser }
