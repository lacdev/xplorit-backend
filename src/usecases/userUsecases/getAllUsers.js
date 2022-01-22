import { User } from 'models/user.model'

const getAllUsers = async () => await User.find()

export { getAllUsers }
