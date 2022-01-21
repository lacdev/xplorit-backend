const getLikesMadeByUser = async (id) => await User.findById(id)

export { getLikesMadeByUser }
