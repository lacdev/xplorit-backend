import { Route } from '../../models/route.model.js'

const getLikesFromRoute = async (id) => {
  try {
    return await Route.findById(id)
  } catch (error) {
    console.error(error)
  }
}
export { getLikesFromRoute }
