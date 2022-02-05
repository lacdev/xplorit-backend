import { Place } from '../../models/place.model.js'

const getAllPlaces = async () => {
  const myCustomLabels = {
    totalDocs: 'totalPlaces',
    docs: 'places',
  }

  const options = {
    page: 1,
    limit: 9,
    customLabels: myCustomLabels,
  }

  try {
    return await Place.paginate({}, options)
  } catch (error) {
    console.error(error)
  }
}

// const getAllPlaces = async () => {
//   try {
//     return await Place.find()
//   } catch (error) {
//     console.error(error)
//   }
// }

export { getAllPlaces }
