import { getPlacesCreatedByUser } from '../../usecases/userUsecases/getPlacesCreatedByUser.js'

const getPlacesByUser = async (req, res, next) => {
  const { userId } = req.params

  try {
    const placesByUser = getPlacesCreatedByUser(userId)

    res.json({
      message: 'success',
      statusCode: 200,
      data: placesByUser,
    })
  } catch (err) {
    console.error(err)
    next({})
  }
}

export { getPlacesByUser }
