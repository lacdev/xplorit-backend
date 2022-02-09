import { Route } from '../../models/route.model.js'

const getSingleRoute = async (id) =>
  await Route.find({ _id: id }).setOptions({ sanitizeFilter: true })

export { getSingleRoute }
