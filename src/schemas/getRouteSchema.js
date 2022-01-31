const getRouteSchema = {
  type: 'object',
  properties: {
    upTo: { type: 'string' },
    sortBy: { type: 'string' },
    latest: { type: 'string' },
    distance: { type: 'String' },
  },
  optionalProperties: {
    name: { type: 'string' },
    tags: { type: 'array' },
    isOpen: { type: 'boolean' },
    mostLiked: { type: 'boolean' },
  },
  required: ['upTo', 'sortBy', 'latest', 'distance'],
}

export { getRouteSchema }
