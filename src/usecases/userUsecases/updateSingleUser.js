const updateSingleUser = async (id, body) =>
  await User.findByIdAndUpdate(id, body)

export { updateSingleUser }
