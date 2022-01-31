import { Route } from '../../models/route.model.js'

const getSingleRoute = async (id) => {
  try {
    return await Route.find({ _id: id }).setOptions({ sanitizeFilter: true })
  } catch (error) {
    console.error(error)
  }
}

export { getSingleRoute }
