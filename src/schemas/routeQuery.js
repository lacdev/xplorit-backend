const routeQuerySchema = {
  type: 'object',
  properties: {
    page: { type: 'string' },
    limit: { type: 'string' },
    sort: { type: 'string' },
    latest: { type: 'string' },
    distance: { type: 'string' },
    position: { type: 'array' },
    radius: { type: 'string' },
    name: { type: 'string' },
    state: { type: 'string' },
    city: { type: 'string' },
    tags: { type: 'string' },
    open: { type: 'boolean' },
  },
  required: [
    'sort',
    'latest',
    'distance',
    'radius',
    'limit',
    'page',
    'name',
    'state',
    'city',
    'tags',
  ],
}

export { routeQuerySchema }
