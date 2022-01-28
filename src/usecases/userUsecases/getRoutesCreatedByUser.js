import { User } from '../../models/user.model.js'

const getRoutesCreatedByUser = async (id) => {
  try {
    return await User.findById(id)
  } catch (error) {
    console.error(error)
  }
}
export { getRoutesCreatedByUser }
