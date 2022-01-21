const getSinglePlace = async (id) => await Place.findById(id)

export { getSinglePlace }
