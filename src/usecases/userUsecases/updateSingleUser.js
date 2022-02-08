import { User } from '../../models/user.model.js'

const updateSingleUser = async (id, body) => {
  try {
    return await User.findByIdAndUpdate(id, body, { new: true })
  } catch (error) {
    console.error(error)
  }
}

export { updateSingleUser }
