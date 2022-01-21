import { Route } from '../../models/route.model.js'

const getAllRoutes = async () => await Route.find()

const createRoute = async (route) => await Route.create(route)

const getSingleRoute = async (id) => await Route.findById(id)

const updateSingleRoute = async (id, body) =>
  await Route.findByIdAndUpdate(id, body)

const deleteSingleRoute = async (id) => await Route.findByIdAndDelete(id)

export {
  getAllRoutes,
  createRoute,
  getSingleRoute,
  updateSingleRoute,
  deleteSingleRoute,
}
