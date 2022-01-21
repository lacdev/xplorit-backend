const getLikesFromPlace = async (id) => await Place.findById(id)

export { getLikesFromPlace }
