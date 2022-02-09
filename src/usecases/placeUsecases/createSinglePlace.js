import { Place } from '../../models/place.model.js'

const createSinglePlace = async (place) => await Place.create(place)

export { createSinglePlace }
