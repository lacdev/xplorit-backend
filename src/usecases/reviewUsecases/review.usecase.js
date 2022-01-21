import { Route } from '../models/route.model.js'
import { Place } from '../models/place.model.js'

const getAllReviewsFromRoute = async (id) => await Route.findById(id)

const postReviewToRoute = async (id, review) => await Route.findById(id, review)

const updateReviewFromRoute = async (id, body) =>
  await Route.findByIdAndUpdate(id, body)

const deleteReviewFromRoute = async (id) => await Route.findByIdAndDelete(id)

const getAllReviewsFromPlace = async (id) => await Place.findById(id)

const postReviewToPlace = async (id, review) => await Place.findById(id, review)

const updateReviewFromPlace = async (id, body) =>
  await Place.findByIdAndUpdate(id, body)

const deleteReviewFromPlace = async (id) => await Place.findByIdAndDelete(id)

export {
  getAllReviewsFromRoute,
  postReviewToRoute,
  updateReviewFromRoute,
  deleteReviewFromRoute,
  getAllReviewsFromPlace,
  postReviewToPlace,
  updateReviewFromPlace,
  deleteReviewFromPlace,
}
