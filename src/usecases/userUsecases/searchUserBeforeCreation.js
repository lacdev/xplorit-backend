import { User } from '../../models/user.model.js'

const searchForUserBeforeCreation = async (object) => {
  return await User.find(object)
}

export { searchForUserBeforeCreation }
