import Route from 'models/route.model'

const getAllRoutes = async () => await Route.find()

export { getAllRoutes }
