const deleteSinglePlace = async (id) => await Place.findByIdAndDelete(id)

export { deleteSinglePlace }
