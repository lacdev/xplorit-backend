import Place from 'models/place.model'

const deleteSinglePlace = async (id) => await Place.findByIdAndDelete(id)

export { deleteSinglePlace }
