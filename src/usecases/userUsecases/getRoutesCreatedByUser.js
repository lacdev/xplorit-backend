import { Route } from '../../models/route.model.js'

const getRoutesCreatedByUser = async (id) => {
  try {
    return await Route.find({ ownerId: id })
  } catch (error) {
    console.error(error)
  }
}
export { getRoutesCreatedByUser }
