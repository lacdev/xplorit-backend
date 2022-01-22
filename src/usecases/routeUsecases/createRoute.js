import { Route } from '../../models/route.model.js'

const createRoute = async (route) => await Route.create(route)

export { createRoute }
