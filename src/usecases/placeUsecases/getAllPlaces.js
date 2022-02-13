import { Place } from '../../models/place.model.js'

const getAllPlaces = async (requestQuery) => {
  const options = {
    page: parseInt(requestQuery.page) || 1,
    limit: parseInt(requestQuery.limit) || 9,
  }

  // const paginationOptions = {
  //   page: parseInt(requestQuery.page) || 1,
  //   limit: parseInt(requestQuery.limit) || 9,
  //   sort: requestQuery.sort || likes || average || createdAt
  // }

  // const docs = await Place.find({}).sort(sort).limit(limit);

  // const myCustomLabels = {
  //   totalDocs: 'totalPlaces',
  //   docs: 'places',
  // }

  // const options = {
  //   customLabels: myCustomLabels,
  // }

  // My Query Object which will be constructed logically from the queries sent in the request.

  let query = {}

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
    query['$and'] = [{ tags: { $all: tagsToLowerCase } }]
  }

  //TODO convertir elementos tags a lowercase al llegar.

  //Geo queries

  //nearshpere query $centerSphere query with Mongoose

  console.log('Query found??', JSON.stringify(query, '\n', 2))

  return await Place.paginate(query, options)
}

export { getAllPlaces }

// query = { ...query, $and: [{ tags: { $all: tagsToLowerCase } }] }
// for (let key of req.query) {
//   if (key === 'q') {
//     optionals.push()
//   }
// }

// const getClockTime = () => {
//   let now = new Date()
//   let hour = now.getHours()
//   let minute = now.getMinutes()
//   let second = now.getSeconds()
//   let ap = 'AM'
//   if (hour > 11) {
//     ap = 'PM'
//   }
//   if (hour > 12) {
//     hour = hour - 12
//   }
//   if (hour == 0) {
//     hour = 12
//   }
//   if (hour < 10) {
//     hour = '0' + hour
//   }
//   if (minute < 10) {
//     minute = '0' + minute
//   }
//   if (second < 10) {
//     second = '0' + second
//   }
//   let timeString = hour + ':' + minute + ':' + second + ' ' + ap
//   return timeString
// }

// {$or:[], {$and:[]tagas y geo query }}

//{ <field>: /pattern/<options> }

// const tagFilters = [{ tags: { $all: { $expr: { requestQuery.tags.map(tag => tag.toLowerCase())  } } } }]

// const tagFilters = [{ tags: { $all: requestQuery.tags } }] //['tag1', 'tag2']

// query = { ...query, $or: qFilters }
