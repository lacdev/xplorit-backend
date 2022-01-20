import { Place } from 'models/place.model'

const getAllPlaces = async () => await Place.find()

const createSinglePlace = async (place) => await Place.create(place)

const getSinglePlace = async (id) => await Place.findById(id)

const updateSinglePlace = async (id, body) =>
  await Place.findByIdAndUpdate(id, body)

const deleteSinglePlace = async (id) => await Place.findByIdAndDelete(id)

export {
  getAllPlaces,
  createSinglePlace,
  getSinglePlace,
  updateSinglePlace,
  deleteSinglePlace,
}
