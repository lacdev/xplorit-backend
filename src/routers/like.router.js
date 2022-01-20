import * as express from 'express'
import * as likeController from 'controllers/like.controller'

const router = express.Router()

//Likes in places routers
router.get('/:id/likes', likeController.getLikesInPlace)
router.post('/:id/likes', likeController.saveLikeInPlace)
router.delete('/:id/likes/:id', likeController.deleteLikeInPlace)

//Likes in routes routers
router.get('/:id/likes', likeController.getLikesInRoute)
router.post('/:id/likes', likeController.saveLikeInRoute)
router.delete('/:id/likes/:id', likeController.deleteLikeInRoute)

export default router
