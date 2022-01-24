import { User } from '../../models/user.model.js'

const getSingleUser = async (id) => {
  return await User.findById(id)
    .select('username')
    .find({ hashedPassword: { $ne: null } })
    .setOptions({ sanitizeFilter: true })
}

// const getSingleUser = async (id) => {
//   await User.find({ _id: id })
//     .select('username _id')
//     .find({ hashedPassword: { $ne: null } })
//     .setOptions({ sanitizeFilter: true })
// }

export { getSingleUser }
