import { User } from '../../models/user.model.js'

const getSingleUser = async (id) =>
  await User.findById(id)
    .select('username _id')
    .find({ hashedPassword: { $ne: null } })
    .setOptions({ sanitizeFilter: true })

export { getSingleUser }
