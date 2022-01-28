import { User } from '../../models/user.model.js'

const searchForUserBeforeCreation = async (object) => {
  try {
    return await User.find(object, { lean: true })
  } catch (error) {
    console.error(error)
  }
}

export { searchForUserBeforeCreation }
