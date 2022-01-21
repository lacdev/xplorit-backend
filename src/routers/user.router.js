import express from 'express'
import * as userController from '../controllers/user.controller.js'
import * as opsController from '../controllers/userops.controller.js'

const router = express.Router()

//User controllers
router.get('/', userController.getUsers)
router.get('/:userId', userController.getUser)
router.post('/', userController.saveUser)
router.patch('/:userId', userController.updateUser)
router.delete('/:userId', userController.deleteUser)

//User Ops controllers
router.get('/:userId/likes', opsController.getLikesByUser)
router.get('/:userId/reviews', opsController.getReviewsByUser)
router.get('/:userId/places', opsController.getPlacesByUser)
router.get('/:userId/routes', opsController.getRoutesByUser)

export { router as UsersRouter }
