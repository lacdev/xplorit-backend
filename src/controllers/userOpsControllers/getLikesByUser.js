import { getSingleUser } from '../../usecases/userUsecases/getSingleUser.js'
import { getLikesMadeByUser } from '../../usecases/userUsecases/getLikesMadeByUser.js'

const getLikesByUser = async (req, res, next) => {
  const { userId } = req.params

  try {
    const foundUser = await getSingleUser(userId)

    const likesByUser = getLikesMadeByUser(foundUser._id)

    res.json({
      message: 'success',
      payload: {
        data: likesByUser,
        statusCode: 200,
      },
    })
  } catch (err) {
    console.error(err)
    next({})
  }
}

export { getLikesByUser }
