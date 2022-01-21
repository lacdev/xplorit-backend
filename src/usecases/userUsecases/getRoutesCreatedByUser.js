const getRoutesCreatedByUser = async (id) => await User.findById(id)

export { getRoutesCreatedByUser }
