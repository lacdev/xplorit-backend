import { getAllUsers } from '../../usecases/userUsecases/getAllUsers.js'
import { ApiError } from '../../errors/ApiError.js'
import { isEmptyArray } from '../../utils/checkForEmptyArray.js'

const getUsers = async (req, res, next) => {
  try {
    const allUsers = await getAllUsers(req.query)

    if (isEmptyArray(allUsers)) {
      next(ApiError.notFound('No users were found.'))
    }

    res.json({
      message: 'success',
      statusCode: 200,
      data: allUsers,
    })
  } catch (err) {
    if (err.name === 'ValidationError') {
      next(
        ApiError.badRequest({
          message: 'Validation Error',
          errors: err,
        })
      )
      return
    } else {
      console.log(err)
      next({})
    }
  }
}

// for (const key in query) {
//   if (
//     key === 'limit' ||
//     key === 'page' ||
//     key === 'lat' ||
//     key === 'lng' ||
//     key === 'radius'
//   ) {
//     filter[key] = parseInt(query[key])
//   }

//   if (key === 'sort' || key === 'latest' || key === 'open') {
//     filter[key] = query[key].toBoolean
//   }
// }

// if (key === 'tags' && key.length) {
//   filter[key] = query[key].
// }

//   limit: '1',
// page: '10',
// sort: 'likes',
// open: 'true',
// latest: 'true',
// lat: '12345',
// lng: '09876',
// radius: '25',
// name: 'playa',
// state: 'Quintana Roo',
// tags: [ 'playa', 'entretenimiento', 'nocturno' ],
// city: 'playa del carmen'

// filter.address.state = { key }
// console.log('this key is named state')
// filter['address'][key] = query[key]
// }

// if (key === ['city']) {
//   // filter.address.city = { key }
//   filter[key] = { key: query[key] }
// }

//Mi query ya viene validado y parseado desde ajv

//Pasar el query al middleware y este

// const query = {}
// for (let key in req.query) {
//   req.query[key] !== '' ? (query[key] = req.query[key]) : null
// }

// mongoose.model('customers').find(query, function (err, customers) {})

// console.log('Is this my query?', req.query)

// const {
//   limit,
//   page,
//   sort,
//   open,
//   latest,
//   lat,
//   lng,
//   radius,
//   name,
//   state,
//   tags,
//   city,
// } = req.query

// const filter = {}

// if (limit) filter.limit = 10 || 3
// if (page) filter.page = 2 || 5
// if (sort) filter.sort = true
// if (open) filter.open = true || false
// if (latest) filter.latest = true || false
// if (state) filter.address.state = state

// if (state) filter.state = { address.state : state }
//       if(pointsToBe) filters.pointsToBe =  pointsToBe ;

// ifor (variable in object) {
//   statement
// }

// const query = req.query

// filter[key] = req.query[key]

//

// console.log('Is this my filter object? updated', filter)

//Filters object pending
//Example getAllusers({filters}, {query})
//tags[]=aire libre&tags[]=entretenimiento&tags[]=playa&tags[]=nocturno to send array in query
// { filter  },

export { getUsers }
