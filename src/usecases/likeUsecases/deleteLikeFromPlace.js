const deleteLikeFromPlace = async (id) => await Place.findByIdAndDelete(id)

export { deleteLikeFromPlace }
