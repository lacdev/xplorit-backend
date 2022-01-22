import Route from 'models/route.model'

const deleteSingleRoute = async (id) => await Route.findByIdAndDelete(id)

export { deleteSingleRoute }
