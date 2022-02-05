import { Route } from '../../models/route.model.js'

const getAllRoutes = async () => {
  const myCustomLabels = {
    totalDocs: 'totalRoutes',
    docs: 'routes',
  }

  const options = {
    page: 1,
    limit: 9,
    customLabels: myCustomLabels,
  }
  try {
    return await Route.paginate({}, options)
  } catch (error) {
    console.error(error)
  }
}

// const getAllRoutes = async () => {

//   try {
//     return await Route.find({})
//   } catch (error) {
//     console.error(error)
//   }
// }

export { getAllRoutes }
