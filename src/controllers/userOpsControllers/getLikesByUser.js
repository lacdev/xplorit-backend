import { getLikesMadeByUser } from '../../usecases/userUsecases/getLikesMadeByUser.js'

const getLikesByUser = async (req, res, next) => {
  const { userId } = req.params

  try {
    const likesByUser = getLikesMadeByUser(userId)

    res.json({
      message: 'success',
      statusCode: 200,
      data: likesByUser,
    })
  } catch (err) {
    console.error(err)
    next({})
  }
}

export { getLikesByUser }
