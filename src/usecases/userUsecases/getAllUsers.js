import { User } from '../../models/user.model.js'

const getAllUsers = async () => await User.find()

export { getAllUsers }
