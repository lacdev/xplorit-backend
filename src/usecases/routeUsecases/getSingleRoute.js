import { Route } from '../../models/route.model.js'

// let projection = { _id: 1, username: 1, avatar: 1, coverPhoto: 1, createdAt: 1 }

const getSingleRoute = async (query) =>
  await Route.findOne(query).populate({
    path: 'ownerId',
    select: 'username avatar',
  })

export { getSingleRoute }
