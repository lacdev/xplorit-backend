import { Route } from '../../models/route.model.js'

const getAllRoutes = async () => await Route.find()

export { getAllRoutes }
