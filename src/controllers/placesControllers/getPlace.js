import { getSinglePlace } from '../../usecases/placeUsecases/getSinglePlace.js'
import { ApiError } from '../../errors/ApiError.js'
import { isEmptyObject } from '../../utils/checkForEmpyObject.js'

const getPlace = async (req, res, next) => {
  const { placeId } = req.params

  try {
    const singlePlace = await getSinglePlace(placeId)

    if (isEmptyObject(singlePlace)) {
      next(ApiError.notFound('No single place with this ID was found.'))
      return
    }

    res.json({
      message: 'success',
      description: 'Place found',
      statusCode: 200,
      data: singlePlace,
    })
  } catch (err) {
    console.error(err)
    next({})
  }
}

export { getPlace }
