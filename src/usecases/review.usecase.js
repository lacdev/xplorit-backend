import { Route } from 'models/route.model'

const getAllRoutes = async () => await Route.find()

const createRoute = async (route) => await Route.create(route)

const getSingleRoute = async (id) => await Route.findById(id)

const updateRoute = async (id, body) => await Route.findByIdAndUpdate(id, body)

const getLikesFromRoute = async (id) => await Route.findById(id)

const postLikeToRoute = async (id, like) =>
  await Route.findByIdAndUpdate(id, like)

const deleteLikeFromRoute = async (id) => await Route.findByIdAndDelete(id)

const getAllReviewsFromRoute = async (id) => await Route.findById(id)

const postReviewToRoute = async (id, review) => await Route.findById(id, review)

const updateReviewFromRoute = async (id, body) =>
  await Route.findByIdAndUpdate(id, body)

const deleteReviewFromRoute = async (id) => await Route.findByIdAndDelete(id)

export {
  getAllRoutes,
  createRoute,
  getSingleRoute,
  updateRoute,
  getLikesFromRoute,
  postLikeToRoute,
  deleteLikeFromRoute,
  getAllReviewsFromRoute,
  postReviewToRoute,
  updateReviewFromRoute,
  deleteReviewFromRoute,
}
