import * as express from 'express'
import * as likeController from 'controllers/like.controller'

const router = express.Router()

//Likes in places routers
router.get('/places/:id/likes', likeController.getLikesInPlace)
router.post('/places/:id/likes', likeController.saveLikeInPlace)
router.delete('/places/:id/likes/:id', likeController.deleteLikeInPlace)

//Likes in routes routers
router.get('routes/:id/likes', likeController.getLikesInRoute)
router.post('routes/:id/likes', likeController.saveLikeInRoute)
router.delete('routes/:id/likes/:id', likeController.deleteLikeInRoute)

export default router
