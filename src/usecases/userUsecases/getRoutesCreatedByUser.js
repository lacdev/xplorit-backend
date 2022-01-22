import { User } from '../../models/user.model.js'

const getRoutesCreatedByUser = async (id) => await User.findById(id)

export { getRoutesCreatedByUser }
