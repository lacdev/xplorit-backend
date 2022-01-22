import { Route } from '../../models/route.model.js'

const getSingleRoute = async (id) => await Route.findById(id)

export { getSingleRoute }
