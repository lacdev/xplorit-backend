import { User } from 'models/user.model'

const deleteSingleUser = async (id) => await User.findByIdAndDelete(id)

export { deleteSingleUser }
