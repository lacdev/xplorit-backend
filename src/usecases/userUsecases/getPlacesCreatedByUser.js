const getPlacesCreatedByUser = async (id) => await User.findById(id)

export { getPlacesCreatedByUser }
