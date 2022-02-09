const placeQuerySchema = {
  type: 'object',
  properties: {
    page: { type: 'string', to: Number }, //a particular page from the paginated results. Default is page 1
    limit: { type: 'string', to: Number }, //limit of places per page, Default can be 5 or 9 if places or reviews.
    sort: { type: 'string' }, //sort by likes or average always ascendent.
    latest: { type: 'string', to: Boolean }, //latest places created, sorted by date of creation, false by default.
    lat: { type: 'string', to: Number }, //send latitude coordinates.
    lng: { type: 'string', to: Number }, //send longitude coordinates.
    radius: { type: 'string', to: Number }, //amount in km to search around a particular point.
    name: { type: 'string' }, //name of a particular place if any.
    state: { type: 'string' }, //search for places in a particular state.
    city: { type: 'string' }, //search for places in a particular city.
    tags: { type: 'array' }, //search by tags. If multiple tags are given, send them in the same query
    open: { type: 'boolean', to: Boolean }, //search for places opened only, false by default.
  },
}

export { placeQuerySchema }
