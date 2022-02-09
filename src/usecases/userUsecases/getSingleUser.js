import { User } from '../../models/user.model.js'

const getSingleUser = async (query) =>
  await User.findOne(query).select('_id username  avatar coverPhoto')

export { getSingleUser }
