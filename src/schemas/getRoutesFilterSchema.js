const getRoutesSchema = {
  type: 'object',
  properties: {
    page: { type: 'String' },
    limit: { type: 'String' },
    sort: { type: 'string' },
    latest: { type: 'String' },
    distance: { type: 'String' },
    position: { type: 'array' },
    radius: { type: 'String' },
    name: { type: 'String' },
    state: { type: 'String' },
    city: { type: 'String' },
    tags: { type: 'String' },
    isOpen: { type: 'boolean' },
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

export { getRoutesSchema }
