import { Place } from '../../models/place.model.js'

const getAllPlaces = async () => await Place.find()

export { getAllPlaces }
