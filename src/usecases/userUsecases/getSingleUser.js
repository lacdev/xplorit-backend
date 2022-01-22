import { User } from '../../models/user.model.js'

const getSingleUser = async (id) => await User.findById(id)

export { getSingleUser }
