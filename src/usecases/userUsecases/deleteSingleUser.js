import { User } from '../../models/user.model.js'

const deleteSingleUser = async (id) => {
  try {
    return await User.findByIdAndDelete(id)
  } catch (error) {
    console.error(error)
  }
}

export { deleteSingleUser }
