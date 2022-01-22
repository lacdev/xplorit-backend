import { User } from '../../models/user.model.js'

const getPlacesCreatedByUser = async (id) => await User.findById(id)

export { getPlacesCreatedByUser }
