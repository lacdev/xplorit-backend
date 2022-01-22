import Place from 'models/place.model'

const createSinglePlace = async (place) => await Place.create(place)

export { createSinglePlace }
