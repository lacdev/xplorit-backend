import { Place } from 'models/place.model'

const getAllPlaces = async () => await Place.find()

const createPlace = async (place) => await Place.create(place)

const getPlaceById = async (id) => await Place.findById(id)

const updatePlaceById = async (id, body) =>
  await Place.findByIdAndUpdate(id, body)

const getLikesFromPlaceById = async (id) => await Place.findById(id)

const postLikeToPlaceById = async (id, like) =>
  await Place.findByIdAndUpdate(id, like)

const deleteLikeFromPlaceById = async (id) => await Place.findByIdAndDelete(id)

const getAllReviewsFromPlaceById = async (id) => await Place.findById(id)

const postReviewFromPlaceById = async (id, review) =>
  await Place.findById(id, review)

const updateReviewFromPlaceById = async (id, body) =>
  await Place.findByIdAndUpdate(id, body)

const deleteReviewFromPlaceById = async (id) =>
  await Place.findByIdAndDelete(id)

export {
  getAllPlaces,
  createPlace,
  getPlaceById,
  updatePlaceById,
  getLikesFromPlaceById,
  postLikeToPlaceById,
  deleteLikeFromPlaceById,
  getAllReviewsFromPlaceById,
  postReviewFromPlaceById,
  updateReviewFromPlaceById,
  deleteReviewFromPlaceById,
}
