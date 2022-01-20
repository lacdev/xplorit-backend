import { Route } from '../models/route.model.js'
import { Place } from '../models/place.model.js'

const getLikesFromRoute = async (id) => await Route.findById(id)

const postLikeToRoute = async (id, like) =>
  await Route.findByIdAndUpdate(id, like)

const deleteLikeFromRoute = async (id) => await Route.findByIdAndDelete(id)

const getLikesFromPlace = async (id) => await Place.findById(id)

const postLikeToPlace = async (id, like) =>
  await Place.findByIdAndUpdate(id, like)

const deleteLikeFromPlace = async (id) => await Place.findByIdAndDelete(id)

export {
  getLikesFromPlace,
  getLikesFromRoute,
  deleteLikeFromPlace,
  deleteLikeFromRoute,
  postLikeToRoute,
  postLikeToPlace,
}
