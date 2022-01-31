import { User } from '../../models/user.model.js'

const getSingleUser = async (id) => {
  try {
    return await User.find({ _id: id })
      .select('username _id avatar coverPhoto')
      .find({ hashedPassword: { $ne: null } })
      .setOptions({ sanitizeFilter: true })
  } catch (error) {
    console.error(error)
  }
}

export { getSingleUser }
