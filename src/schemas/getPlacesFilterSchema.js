const getPlaceSchema = {
  type: 'object',
  properties: {
    upTo: { type: 'string' },
    sort: { type: 'string' },
    latest: { type: 'string' },
    name: { type: 'string' },
    tags: { type: 'array' },
    isOpen: { type: 'boolean' },
    mostLiked: { type: 'boolean' },
  },
  required: ['upTo', 'sortBy', 'latest'],
}

export { getPlaceSchema }
