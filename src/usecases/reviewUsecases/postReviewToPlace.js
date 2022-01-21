const postReviewToPlace = async (id, review) => await Place.findById(id, review)

export { postReviewToPlace }
