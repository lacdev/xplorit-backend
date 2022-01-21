import express from 'express'
import * as likeController from '../controllers/likesControllers/like.controller.js'

const router = express.Router()

//Likes in places routers
router.get('/:placeId/likes', likeController.getLikesInPlace)
router.post('/:placeId/likes', likeController.saveLikeInPlace)
router.delete('/:placeId/likes/:likeId', likeController.deleteLikeInPlace)

//Likes in routes routers
router.get('/:routeId/likes', likeController.getLikesInRoute)
router.post('/:routeId/likes', likeController.saveLikeInRoute)
router.delete('/:routeId/likes/:likeId', likeController.deleteLikeInRoute)

export { router as LikesRouter }
