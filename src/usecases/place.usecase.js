import { Place } from 'models/place.model'

const getAllPlaces = async () => await Place.find()

const createPlace = async (place) => await Place.create(place)

const getSinglePlace = async (id) => await Place.findById(id)

const updatePlace = async (id, body) => await Place.findByIdAndUpdate(id, body)

const deletePlace = async (id) => await Place.findByIdAndDelete(id)

export { getAllPlaces, createPlace, getSinglePlace, updatePlace, deletePlace }
