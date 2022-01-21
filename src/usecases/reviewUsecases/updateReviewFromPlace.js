const updateReviewFromPlace = async (id, body) =>
  await Place.findByIdAndUpdate(id, body)

export { updateReviewFromPlace }
