import { User } from '../../models/user.model.js'

const createSingleUser = async (user) => {
  try {
    return await User.create(user)
  } catch (error) {
    console.error(error)
  }
}

export { createSingleUser }
