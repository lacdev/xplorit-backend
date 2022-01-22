import Place from 'models/place.model'

const getAllPlaces = async () => await Place.find()

export { getAllPlaces }
