import { User } from '../../models/user.model.js'

let projection = {
  _id: 1,
  username: 1,
  email: 1,
  password: 1,
}

const searchUserBeforeLogin = async (query) =>
  await User.findOne(query).select(projection)

export { searchUserBeforeLogin }
