import { Route } from '../../models/route.model.js'

const createRoute = async (route) => {
  try {
    return await Route.create(route)
  } catch (error) {
    console.error(error)
  }
}

export { createRoute }
