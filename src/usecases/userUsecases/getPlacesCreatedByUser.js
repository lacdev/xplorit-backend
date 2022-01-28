import { User } from '../../models/user.model.js'

const getPlacesCreatedByUser = async (id) => {
  try {
    return await User.findById(id)
  } catch (error) {
    console.error(error)
  }
}

export { getPlacesCreatedByUser }
