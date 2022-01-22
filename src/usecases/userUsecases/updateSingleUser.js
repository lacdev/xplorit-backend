import User from 'models/user.model'

const updateSingleUser = async (id, body) =>
  await User.findByIdAndUpdate(id, body)

export { updateSingleUser }
