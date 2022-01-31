import { Route } from '../../models/route.model.js'

const getAllRoutes = async () => {
  try {
    return await Route.find({})
  } catch (error) {
    console.error(error)
  }
}

export { getAllRoutes }
