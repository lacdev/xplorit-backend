import { getAllUsers } from '../../usecases/userUsecases/getAllUsers.js'
import { ApiError } from '../../errors/ApiError.js'
import { isEmptyArray } from '../../utils/checkForEmptyArray.js'

const getUsers = async (req, res, next) => {
  console.log('Is this my query?', req.query)

  let page = parseInt(req.query.page) || 1
  let limit = parseInt(req.query.limit) || 10

  //Filters object pending
  //Example getAllusers({filters}, {query})

  try {
    const allUsers = await getAllUsers({ page, limit })
    if (isEmptyArray(allUsers)) {
      next(ApiError.notFound('No users were found.'))
    }

    res.json({
      message: 'success',
      statusCode: 200,
      data: allUsers,
    })
  } catch (err) {
    console.error(err)
    next({})
  }
}

export { getUsers }
