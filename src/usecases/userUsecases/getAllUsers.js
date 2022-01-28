import { User } from '../../models/user.model.js'

const getAllUsers = async () => {
  try {
    return await User.find()
      .select('username')
      .find({ hashedPassword: { $ne: null } })
      .setOptions({ sanitizeFilter: true })
  } catch (error) {
    console.error(error)
  }
}

export { getAllUsers }
