import express from 'express'
import { getUsers } from '../controllers/usersControllers/getUsers.js'
import { getUser } from '../controllers/usersControllers/getUser.js'
import { saveUser } from '../controllers/usersControllers/saveUser.js'
import { updateUser } from '../controllers/usersControllers/updateUser.js'
import { deleteUser } from '../controllers/usersControllers/deleteUser.js'
import { getLikesByUser } from '../controllers/userOpsControllers/getLikesByUser.js'
import { getReviewsByUser } from '../controllers/userOpsControllers/getReviewsByUser.js'
import { getPlacesByUser } from '../controllers/userOpsControllers/getPlacesByUser.js'
import { getRoutesByUser } from '../controllers/userOpsControllers/getRoutesByUser.js'

const router = express.Router()

//User controllers
router.get('/', getUsers)
router.get('/:userId', getUser)
router.post('/', saveUser)
router.patch('/:userId', updateUser)
router.delete('/:userId', deleteUser)

//User Ops controllers
router.get('/:userId/likes', getLikesByUser)
router.get('/:userId/reviews', getReviewsByUser)
router.get('/:userId/places', getPlacesByUser)
router.get('/:userId/routes', getRoutesByUser)

export { router as UsersRouter }
