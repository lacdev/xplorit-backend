import { getSingleUser } from '../../usecases/userUsecases/getSingleUser.js'
import { getPlacesCreatedByUser } from '../../usecases/userUsecases/getPlacesCreatedByUser.js'

const getPlacesByUser = async (req, res, next) => {
  const { userId } = req.params

  try {
    const foundUser = await getSingleUser(userId)
    const placesByUser = getPlacesCreatedByUser(foundUser._id)

    res.json({
      message: 'success',
      payload: {
        data: placesByUser,
        statusCode: 200,
      },
    })
  } catch (err) {
    console.error(err)
    next({})
  }
}

export { getPlacesByUser }
