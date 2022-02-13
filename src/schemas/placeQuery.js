// const placeQuerySchema = {
//   type: 'object',
//   properties: {
//     page: { type: 'string', to: Number }, //a particular page from the paginated results. Default is page 1
//     limit: { type: 'string', to: Number }, //limit of places per page, Default can be 5 or 9 if places or reviews.
//     name: { type: 'string' }, //name of a particular place if any.
//     sort: { type: 'string' }, //sort by likes or average always ascendent.
//     state: { type: 'string' }, //search for places in a particular state.
//     city: { type: 'string' }, //search for places in a particular city.
//     tags: { type: 'array' }, //search by tags. If multiple tags are given, send them in the same query
//     latest: { type: 'string', //true or false to: Boolean }, //latest places created, sorted by date of creation, false by default.
//   },
// }

// open: { type: 'boolean', to: Boolean }, //search for places opened only, false by default.
// lat: { type: 'string', to: Number }, //send latitude coordinates.
// lng: { type: 'string', to: Number }, //send longitude coordinates.
// radius: { type: 'string', to: Number }, //amount in km to search around a particular point.

// export { placeQuerySchema }

// // query state
// // y si state existe en el query
// // se agrega al query find
// // find({ address.state: state })

//   data : [{
//     estado: 'Aguascalientes',
//     municipios: ['municipios']
//   }
// ]
