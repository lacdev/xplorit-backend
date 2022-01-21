const getAllReviewsFromPlace = async (id) => await Place.findById(id)

export { getAllReviewsFromPlace }
