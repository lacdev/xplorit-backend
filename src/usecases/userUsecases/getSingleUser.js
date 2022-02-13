import { User } from '../../models/user.model.js'

let projection = { _id: 1, username: 1, avatar: 1, coverPhoto: 1, createdAt: 1 }

const getSingleUser = async (query) =>
  await User.findOne(query).select(projection)

export { getSingleUser }
