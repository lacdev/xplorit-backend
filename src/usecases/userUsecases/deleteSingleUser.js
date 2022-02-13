import { User } from '../../models/user.model.js'

const deleteSingleUser = async (id) => await User.findByIdAndDelete(id)

export { deleteSingleUser }
