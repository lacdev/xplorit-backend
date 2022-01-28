import { Route } from '../../models/route.model.js'

const deleteSingleRoute = async (id) => {
  try {
    return await Route.findByIdAndDelete(id)
  } catch (error) {
    console.error(error)
  }
}

export { deleteSingleRoute }
