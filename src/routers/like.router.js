import express from 'express'
import { getLikesInPlace } from '../controllers/likesControllers/getLikesInPlace.js'
import { saveLikeInPlace } from '../controllers/likesControllers/saveLikeInPlace.js'
import { deleteLikeInPlace } from '../controllers/likesControllers/deleteLikeInPlace.js'
import { getLikesInRoute } from '../controllers/likesControllers/getLikesInRoute.js'
import { saveLikeInRoute } from '../controllers/likesControllers/saveLikeInRoute.js'
import { deleteLikeInRoute } from '../controllers/likesControllers/deleteLikeInRoute.js'
import { validatePlaceRetrieve } from '../validators/likesValidators/getLikesInPlaceValidation.js'
import { ValidateLikeInPlace } from '../validators/likesValidators/saveLikeInPlaceValidation.js'
import { ValidateLikeInRoute } from '../validators/likesValidators/saveLikeInRouteValidation.js'
import {ValidateLikeDeletionInPlace} from  '../validators/likesValidators/deleteLikeInPlaceValidation.js'
import { ValidateLikeDeletionInRoute } from 'validators/likesValidators/deleteLikeInRouteValidation.js'
import { validateRouteRetrieve } from 'validators/likesValidators/getLikesInRouteValidation.js'
const router = express.Router()

//Likes in places routers
router.get('/:placeId/likes',validatePlaceRetrieve, getLikesInPlace)
router.post('/:placeId/likes',ValidateLikeInPlace, saveLikeInPlace)
router.delete('/:placeId/likes/:likeId',ValidateLikeDeletionInPlace, deleteLikeInPlace)

//Likes in routes routers
router.get('/:routeId/likes',validateRouteRetrieve, getLikesInRoute)
router.post('/:routeId/likes',ValidateLikeInRoute, saveLikeInRoute)
router.delete('/:routeId/likes/:likeId',ValidateLikeDeletionInRoute, deleteLikeInRoute)

export { router as LikesRouter }
