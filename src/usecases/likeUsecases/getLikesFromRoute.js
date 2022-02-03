import { Route } from '../../models/route.model.js'

const getLikesFromRoute = async (id) => {
  try {
    return await Route.find(id)
    .select()

  } catch (error) {
    console.error(error)
  }
}

export { getLikesFromRoute }
