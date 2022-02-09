import { Route } from '../../models/route.model.js'

const updateSingleRoute = async (id, body) =>
  await Route.findByIdAndUpdate(id, body, { new: true })

export { updateSingleRoute }
