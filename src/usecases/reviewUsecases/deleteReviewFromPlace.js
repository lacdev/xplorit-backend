const deleteReviewFromPlace = async (id) => await Place.findByIdAndDelete(id)

export { deleteReviewFromPlace }
