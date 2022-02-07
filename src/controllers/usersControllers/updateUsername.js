import { updateSingleUser } from '../../usecases/userUsecases/updateSingleUser.js'
// import { hashPassword } from '../../lib/bcrypt.js'

const updateUsername = async (req, res, next) => {
  try {
    const { userId } = req.params
    const { username } = req.body

    console.log('Does the controller also gets the new username?', username)

    // const hashedPass = await hashPassword(password)

    // const updatedUser = await updateSingleUser(userId, {
    //   password: hashedPass,
    // })

    const updatedUser = await updateSingleUser(userId, {
      username,
    })

    if (updatedUser) {
      res.json({
        success: true,
        description: 'Username updated successfully',
        statusCode: 201,
      })
    }
  } catch (err) {
    console.error(err)
    next({})
  }
}

export { updateUsername }
