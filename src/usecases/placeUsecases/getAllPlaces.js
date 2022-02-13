import { Place } from '../../models/place.model.js'

const getAllPlaces = async (requestQuery = {}) => {
  const myCustomLabels = {
    totalDocs: 'totalPlaces',
    docs: 'places',
  }

  const options = {
    page: parseInt(requestQuery.page) || 1,
    limit: parseInt(requestQuery.limit) || 9,
    //   sort: requestQuery.sort || likes || average || createdAt
    customLabels: myCustomLabels,
    projection: {
      address: 1,
      location: 1,
      _id: 1,
      ownerId: 1,
      name: 1,
      description: 1,
      average: 1,
      likes: 1,
      tags: 1,
      images: 1,
      createdAt: 1,
      updatedAt: 1,
    },
  }

  // My Query Object which will be constructed logically from the queries sent in the request.

  let query = {}

  let $and = []

  console.log('requestQuery found??', requestQuery)

  //Filters for the q parameter, searches globally for keywords in the selected fields.

  const qFilters = [
    { 'address.state': { $regex: `${requestQuery.q}`, $options: 'i' } },
    { 'address.city': { $regex: `${requestQuery.q}`, $options: 'i' } },
    { name: { $regex: `${requestQuery.q}`, $options: 'i' } },
    { description: { $regex: `${requestQuery.q}`, $options: 'i' } },
  ]

  //User searched for a keyword in the search bar ?

  if (requestQuery.q) {
    console.log('my query?', requestQuery.q)
    query['$or'] = qFilters
  }

  //User sent tags with the checkboxes?

  if (requestQuery.tags) {
    const tagsArray = requestQuery.tags.split(',')
    const tagsToLowerCase = tagsArray.map((tag) => tag.toLowerCase())
    $and.push({ tags: { $all: tagsToLowerCase } })
    query['$and'] = $and
  }

  //Geo queries are always required.

  if (requestQuery.lng && requestQuery.lat && requestQuery.distance) {
    let longitude = parseFloat(requestQuery.lng)
    let latitude = parseFloat(requestQuery.lat)
    let distance =
      parseInt(requestQuery.distance) > 1 ? parseInt(requestQuery.distance) : 1

    // console.log('whats the distance bro?', distance)

    $and.push({
      'location.coordinates': {
        $geoWithin: {
          $centerSphere: [[longitude, latitude], distance / 3963.2],
        },
      },
    })

    query['$and'] = $and
  }

  // console.log('Query found??', JSON.stringify(query, '\n', 2))

  return await Place.paginate(query, options)
}

export { getAllPlaces }
