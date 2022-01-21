const getSingleUser = async (id) => await User.findById(id)

export { getSingleUser }
