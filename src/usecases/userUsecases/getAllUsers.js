import { User } from '../../models/user.model.js'

const getAllUsers = async (requestQuery) => {
  const options = {
    page: parseInt(requestQuery.page) || 1,
    limit: parseInt(requestQuery.limit) || 10,
    projection: { _id: 1, username: 1, avatar: 1, coverPhoto: 1, createdAt: 1 },
  }

  return await User.paginate(
    {
      // $or: [
      //   { username: { $regex: `${requestQuery.q}`, $options: 'i' } },
      //   { avatar: { $regex: `${requestQuery.q}`, $options: 'i' } },
      //   { email: { $regex: `${requestQuery.q}`, $options: 'i' } },
      // ],
    },
    options
  )
}

export { getAllUsers }
