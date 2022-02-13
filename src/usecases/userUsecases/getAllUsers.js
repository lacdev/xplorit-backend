import { User } from '../../models/user.model.js'

const getAllUsers = async ({
  q,
  page,
  limit,
  name,
  sort,
  state,
  city,
  tags,
  latest,
  email,
  avatar,
}) => {
  const options = {
    page: parseInt(page) || 1,
    limit: parseInt(limit) || 10,
    projection: { _id: 1, username: 1, avatar: 1, coverPhoto: 1, createdAt: 1 },
  }

  // {$or:[], {$and:[]tagas y geo query }}

  const query = {}

  const optionals = []

  // const makeQuery = (req.query) => {
  //   for (let key of req.query) {
  //     if (key === 'q') {
  //       optionals.push({ "address.state": RegExp(q, 'ig') },
  //       {
  //         "address.city": RegExp(q, 'ig'),
  //       },
  //       { "name": RegExp(q, 'ig') },
  //       { "description": RegExp(q, 'ig') })
  //     }
  //   }

  // }

  //si le das a checkbox de guanajuato $and
  // let projection = { username: 1, avatar: 1, coverPhoto: 1 }
  // .select(projection)

  return await User.paginate(
    {
      $or: [
        { username: RegExp(q, 'ig') },
        {
          avatar: RegExp(q, 'ig'),
        },
        { email: RegExp(q, 'ig') },
      ],
    },
    options
  )
}

export { getAllUsers }

// filter

// const makeFilter = (params) => {
//   return Object.entries(params).map(([key, value]) => {
//     console.log(key, value)
//   })
// }

//search a mi condicon or
// todos los tags en el or
// la geo deberia de pushearse en la condicion and

///distance 20 * 1000
//miapi.com?query=guanajuato&tags[]=aire libre, nocturno //implementar los tags mediantes ['aire libre']

// loopear el query

// si existe tags en el query = optional.tags = tags // => []

// { 'description': { $regex: `/${q}/` } },
// { 'name': { $regex: `/${q}/` } },
// { 'address.city': { $regex: `/${q}/` } },

// { 'address.state': { $regex: `/${q}/` } }

// const optional = {
//   $or: [],
// }

// const mandatory = {
//   $and: [],
// }

// if (q) optional.$or.push({ 'address.state': { $regex: `/${q}/` } })

// const query = { ...optional, ...mandatory }

// { tags: { $all: tags } },
// { geo: { 'Point': coordinates: [] } }

// if (name) filter.username = name
// if (avatar) filter.avatar = avatar
// if (email) filter.email = email
// if (sort) filter.sort = { sort }
// if (state) filter.address.state = { state }
// if (city) filter.address.city = { city }
// if (tags) filter.tags = { $in: tags }
// if (latest) filter.sort = { $sort: 'createdAt' }

// if (avatar) filter.avatar = avatar
// if (email) filter.email = email
// if (sort) filter.sort = { sort }
// if (state) filter.address.state = { state }
// if (city) filter.address.city = { city }
// if (tags) filter.tags = { $in: tags }
// if (latest) filter.sort = { $sort: 'createdAt' }

//   if (key === 'state') {
//     optional[key] = { 'address.state': { $regex: `/${req.query[key]}/` } }
//   }

//   if (key === 'city') {
//     optional[key] = { 'address.state': { $regex: `/${req.query[key]}/` } }
//   }

//   if (key === 'name') {
//   }
// }

// console.log('Built my query?', query)

// const myCustomLabels = {
//   totalDocs: 'totalUsers',
//   docs: 'users',
// }

// ({ "address.state": state })
// ({ "address.city": city })
// ({  "scheduleStart": { $lt: new Date() }, "scheduleFinish": { $gt: new Date()}})
// ({ "tags: { $in: [tagsArrayQuery] })
// {tags: { $all: ["tag value", "tag value"] }}
// ({ $near: {{ "coordinates": [lat, lng]}})

// ({ "name": name }) //Exact match

//Regex returns all the docs that includes the regular expression.

// ({
//   name: {
//     $regex: `/${name}/`,
//   },
// })

//AND comparison operators
// $and: [{ SpecialOfferDiscount: { $gte: 150 }}, { Year: { $eq: "2019" } }] }

// db.routes.find({
//   $and: [
//     { $or: [{ dst_airport: 'KZN' }, { src_airport: 'KZN' }] },

//     {
//       $or: [{ airplane: 'CR2' }, { airplane: 'A81' }],
//     },
//   ],
// })

//db.inspections.find(
//   { "$or": [ { "date": "Feb 20 2015" },
//   { "date": "Feb 21 2015" } ],
// "sector": { "$ne": "Cigarette Retail Dealer - 127" }})

// db.companies.find({ "$and": [
//   { "$or": [ { "founded_year": 2004 },
//              { "founded_month": 10 } ] },
//   { "$or": [ { "category_code": "web" },
//              { "category_code": "social" }]}]}).count()

// optionalQueries = { $or: [] }
// strictQueries = { $and: [] }

// {
//   $or: [
//     { description: { $regex: /LOL/ } },
//     { name: { $regex: /JAJAJAJA/ } },
//     { 'address.state': { $regex: /XD/ } },
//     { 'address.city': { $regex: /JEORJOER/ } },
// { tags: { $all: ['familiar','aire libre'] } }, //El usuario le dio click al checkbox de familiar
//   ],{ "$and": [
//     {$nearWhithin: {type: $geometry: [[[

//     ]]]}}
//   ]}
// }
