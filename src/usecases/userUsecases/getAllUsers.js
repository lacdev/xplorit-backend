import { User } from '../../models/user.model.js'

const getAllUsers = async () =>
  await User.find()
    .select('username')
    .find({ hashedPassword: { $ne: null } })
    .setOptions({ sanitizeFilter: true })

export { getAllUsers }
