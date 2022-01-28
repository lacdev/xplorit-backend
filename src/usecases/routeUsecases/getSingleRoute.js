import { Route } from '../../models/route.model.js'

const getSingleRoute = async (id) => {
  try {
    return await Route.find({_id: id})
      .select('RouteId ownerId name description tags fullRoute images')
  } catch (error) {
    console.error(error)
  }
}

export { getSingleRoute }
