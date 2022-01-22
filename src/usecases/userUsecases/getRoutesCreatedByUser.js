import User from 'models/user.model'
import Route from 'models/route.model'

const getRoutesCreatedByUser = async (id) => await User.findById(id)

export { getRoutesCreatedByUser }
