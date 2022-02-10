import { User } from '../../models/user.model.js'

const getAllUsers = async (opts) => {
  const myCustomLabels = {
    totalDocs: 'totalUsers',
    docs: 'users',
  }

  // console.log('filter found??', filter)

  const query = {
    state: 'guanjauto',
    latest: Boolean(opts.latest),
  }

  const options = {
    page: parseInt(opts.page) || 1,
    limit: parseInt(opts.limit) || 10,
  }

  console.log('my options', options)
  // User.find({filter}).limit().skip()
  try {
    return await User.paginate({ filter }, options)
  } catch (error) {
    console.error(error)
  }
}

export { getAllUsers }
