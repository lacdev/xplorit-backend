import { Route } from 'models/route.model'

const getAllRoutes = async () => await Route.find()

const createRoute = async (route) => await Route.create(route)

const getSingleRoute = async (id) => await Route.findById(id)

const updateRoute = async (id, body) => await Route.findByIdAndUpdate(id, body)

const deleteRoute = async (id) => await Route.findByIdAndDelete(id)

export { getAllRoutes, createRoute, getSingleRoute, updateRoute, deleteRoute }
