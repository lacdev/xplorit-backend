import express from 'express'
import multer from 'multer'

import { getUsers } from '../controllers/usersControllers/getUsers.js'
import { getUser } from '../controllers/usersControllers/getUser.js'
import { saveUser } from '../controllers/usersControllers/saveUser.js'
import { deleteUser } from '../controllers/usersControllers/deleteUser.js'
import { getLikesByUser } from '../controllers/userOpsControllers/getLikesByUser.js'
import { getReviewsByUser } from '../controllers/userOpsControllers/getReviewsByUser.js'
import { getPlacesByUser } from '../controllers/userOpsControllers/getPlacesByUser.js'
import { getRoutesByUser } from '../controllers/userOpsControllers/getRoutesByUser.js'
import { validateUserSignup } from '../validators/usersValidators/saveUserValidation.js'
import { validateGetUser } from '../validators/usersValidators/getUserValidation.js'
import { validateUserDeletion } from '../validators/usersValidators/deleteUserValidation.js'
import { validateUserLikes } from '../validators/userOpsValidators/getLikesFromUserValidation.js'
import { validateUserReviews } from '../validators/userOpsValidators/getReviewsFromUserValidation.js'
import { validateUserPlaces } from '../validators/userOpsValidators/getPlacesFromUserValidation.js'
import { validateUserRoutes } from '../validators/userOpsValidators/getRoutesFromUserValidation.js'
import { validateUsernameUpdate } from '../validators/usersValidators/updateUsernameValidation.js'
import { updateUsername } from '../controllers/usersControllers/updateUsername.js'
import { validatePasswordUpdate } from '../validators/usersValidators/updatePasswordValidation.js'
import { updatePassword } from '../controllers/usersControllers/updatePassword.js'
import { validateAvatarUpdate } from '../validators/usersValidators/updateAvatarValidation.js'
import { updateAvatar } from '../controllers/usersControllers/updateAvatar.js'
import { validateCoverUpdate } from '../validators/usersValidators/updateCoverValidation.js'
import { updateCover } from '../controllers/usersControllers/updateCover.js'

const router = express.Router()
const maxSize = 0.5 * 1024 * 1024

const upload = multer({
  storage: multer.memoryStorage(),
  limits: { fileSize: maxSize },
})

// //User controllers
router.get('/', getUsers)
router.get('/:userId', validateGetUser, getUser)
router.post('/', validateUserSignup, saveUser)
router.delete('/:userId', validateUserDeletion, deleteUser)

//User information update endpoints.
router.patch('/:userId/password', validatePasswordUpdate, updatePassword)
router.patch('/:userId/username', validateUsernameUpdate, updateUsername)
router.patch(
  '/:userId/avatar',
  upload.single('avatar'),
  validateAvatarUpdate,
  updateAvatar
)
router.patch(
  '/:userId/cover',
  upload.single('cover'),
  validateCoverUpdate,
  updateCover
)

//User Ops controllers
router.get('/:userId/likes', validateUserLikes, getLikesByUser)
router.get('/:userId/reviews', validateUserReviews, getReviewsByUser)
router.get('/:userId/places', validateUserPlaces, getPlacesByUser)
router.get('/:userId/routes', validateUserRoutes, getRoutesByUser)

export { router as usersRouter }
