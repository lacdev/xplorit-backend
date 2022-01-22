import User from 'models/user.model'

const getSingleUser = async (id) => await User.findById(id)

export { getSingleUser }
