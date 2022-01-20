import express from 'express'
import * as userController from 'controllers/user.controller'
import * as opsController from 'controllers/userops.controller'

const router = express.Router()

//User controllers
router.get('/', userController.getUsers)
router.get('/:id', userController.getUser)
router.post('/', userController.saveUser)
router.patch('/:id', userController.updateUser)
router.delete('/:id', userController.deleteUser)

//User Ops controllers
router.get('/:id/likes', opsController.getLikesByUser)
router.get('/:id/reviews', opsController.getReviewsByUser)
router.get('/:id/places', opsController.getPlacesByUser)
router.get('/:id/routes', opsController.getRoutesByUser)

export { router }
