import { getSingleUser } from '../../usecases/userUsecases/getSingleUser.js'
import { getPlacesCreatedByUser } from '../../usecases/userUsecases/getPlacesCreatedByUser.js'

const getPlacesByUser = async (req, res) => {
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
    res.json({
      message: 'failure',
      error: {
        err,
        description: 'User not found.',
        statusCode: 404,
      },
    })
  }
}

export { getPlacesByUser }
