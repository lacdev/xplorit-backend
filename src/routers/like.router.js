import express from 'express'
import { getLikesInPlace } from '../controllers/likesControllers/getLikesInPlace.js'
import { saveLikeInPlace } from '../controllers/likesControllers/saveLikeInPlace.js'
import { deleteLikeInPlace } from '../controllers/likesControllers/deleteLikeInPlace.js'
import { getLikesInRoute } from '../controllers/likesControllers/getLikesInRoute.js'
import { saveLikeInRoute } from '../controllers/likesControllers/saveLikeInRoute.js'
import { deleteLikeInRoute } from '../controllers/likesControllers/deleteLikeInRoute.js'

const router = express.Router()

//Likes in places routers
router.get('/:placeId/likes', getLikesInPlace)
router.post('/:placeId/likes', saveLikeInPlace)
router.delete('/:placeId/likes/:likeId', deleteLikeInPlace)

//Likes in routes routers
router.get('/:routeId/likes', getLikesInRoute)
router.post('/:routeId/likes', saveLikeInRoute)
router.delete('/:routeId/likes/:likeId', deleteLikeInRoute)

export { router as LikesRouter }
