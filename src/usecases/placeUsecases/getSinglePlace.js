import Place from 'models/place.model'

const getSinglePlace = async (id) => await Place.findById(id)

export { getSinglePlace }
