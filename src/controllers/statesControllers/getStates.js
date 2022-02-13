import { getAllStates } from '../../usecases/stateUsecases/getAllStates.js'
import { ApiError } from '../../errors/ApiError.js'
import { isEmptyArray } from '../../utils/checkForEmptyArray.js'

const getStates = async (req, res, next) => {
  try {
    const allStates = await getAllStates()

    console.log(allStates.map((state) => state.estado))
    console.log(allStates.length)

    if (isEmptyArray(allStates)) {
      next(
        ApiError.notFound({
          message: 'No states were found.',
          data: allStates,
        })
      )
      return
    }

    res.json({
      message: 'success',
      statusCode: 200,
      description: 'States found successfully',
      data: allStates,
    })
  } catch (err) {
    if (err.name === 'ValidationError') {
      next(
        ApiError.badRequest({
          message: 'Validation Error',
          errors: err,
        })
      )
      return
    } else {
      next({})
    }
  }
}

export { getStates }
