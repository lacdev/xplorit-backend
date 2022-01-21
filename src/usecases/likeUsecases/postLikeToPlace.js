const postLikeToPlace = async (id, like) =>
  await Place.findByIdAndUpdate(id, like)

export { postLikeToPlace }
