import { Route } from '../../models/route.model.js'

const getLikesFromRoute = async (id) => await Route.findById(id)

export { getLikesFromRoute }
