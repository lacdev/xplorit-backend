import { updateSingleUser } from '../../usecases/userUsecases/updateSingleUser.js'
import { hashPassword } from '../../lib/bcrypt.js'

const updateUser = async (req, res, next) => {
  try {
    const { userId } = req.params
    // const data = JSON.parse(req.body.data)

    // console.log('Is my data being read in the controller?', data)

    console.log('is my body updated?', req.body)

    // const hashedPass = await hashPassword(data.password)

    // const updatedUser = await updateSingleUser(userId, {
    //   // avatar: avatar,
    //   // coverPhoto: coverPhoto,
    //   // password: hashedPass,
    // })

    if (updatedUser) {
      res.json({
        success: true,
        statusCode: 201,
        description: 'User updated successfully',
      })
    }
  } catch (err) {
    console.error(err)
    next({})
  }
}

export { updateUser }
