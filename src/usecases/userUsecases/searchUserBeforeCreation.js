import { User } from '../../models/user.model.js'

const searchForUserBeforeCreation = async (object) =>
  await User.find(object, { lean: true })

export { searchForUserBeforeCreation }
