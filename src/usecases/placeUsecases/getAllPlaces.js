import { Place } from '../../models/place.model.js'

const getAllPlaces = async (requestQuery) => {
  const options = {
    page: parseInt(requestQuery.page) || 1,
    limit: parseInt(requestQuery.limit) || 10,
  }

  // {$or:[], {$and:[]tagas y geo query }}

  let query = {}

  //{ <field>: /pattern/<options> }

  const qFilters = [
    { 'address.state': { $regex: `${requestQuery.q}`, $options: 'i' } },
    {
      'address.city': { $regex: `${requestQuery.q}`, $options: 'i' },
    },
    { name: { $regex: `${requestQuery.q}`, $options: 'i' } },
    { description: { $regex: `${requestQuery.q}`, $options: 'i' } },
  ]

  // const tagFilters = [{ tags: { $all: { $expr: { requestQuery.tags.map(tag => tag.toLowerCase())  } } } }]

  // const tagFilters = [{ tags: { $all: requestQuery.tags } }] //['tag1', 'tag2']

  if (requestQuery.q) {
    console.log('my query?', requestQuery.q)
    // query = { ...query, $or: qFilters }
    query['$or'] = qFilters
  }

  if (requestQuery.tags) {
    const tagsArray = requestQuery.tags.split(',')
    const tagsToLowerCase = tagsArray.map((tag) => tag.toLowerCase())
    query['$and'] = [{ tags: { $all: tagsToLowerCase } }]
  }

  //TODO convertir elementos tags a lowercase al llegar.
  // query = { ...query, $and: [{ tags: { $all: tagsToLowerCase } }] }
  // for (let key of req.query) {
  //   if (key === 'q') {
  //     optionals.push()
  //   }
  // }

  // const myCustomLabels = {
  //   totalDocs: 'totalPlaces',
  //   docs: 'places',
  // }

  // const options = {
  //   customLabels: myCustomLabels,
  // }

  console.log('Query found??', JSON.stringify(query, '\n', 2))

  try {
    return await Place.paginate(query, options)
  } catch (error) {
    console.error(error)
  }
}

export { getAllPlaces }
