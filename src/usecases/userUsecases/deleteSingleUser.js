const deleteSingleUser = async (id) => await User.findByIdAndDelete(id)

export { deleteSingleUser }
