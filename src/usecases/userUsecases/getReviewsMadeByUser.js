const getReviewsMadeByUser = async (id) => await User.findById(id)

export { getReviewsMadeByUser }
