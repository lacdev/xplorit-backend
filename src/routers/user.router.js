import express from 'express'
import multer from 'multer'

//User crud imports
import { getUsers } from '../controllers/usersControllers/getUsers.js'
import { getUser } from '../controllers/usersControllers/getUser.js'
import { saveUser } from '../controllers/usersControllers/saveUser.js'
// import { deleteUser } from '../controllers/usersControllers/deleteUser.js'

//User crud validation imports
import { validateUserSignup } from '../validators/usersValidators/saveUserValidation.js'
import { validateGetUser } from '../validators/usersValidators/getUserValidation.js'
// import { validateUserDeletion } from '../validators/usersValidators/deleteUserValidation.js'

//User ops imports
import { getLikesByUser } from '../controllers/userOpsControllers/getLikesByUser.js'
import { getReviewsByUser } from '../controllers/userOpsControllers/getReviewsByUser.js'
import { getPlacesByUser } from '../controllers/userOpsControllers/getPlacesByUser.js'
import { getRoutesByUser } from '../controllers/userOpsControllers/getRoutesByUser.js'

//User ops validation imports
import { validateUserLikes } from '../validators/userOpsValidators/getLikesFromUserValidation.js'
import { validateUserReviews } from '../validators/userOpsValidators/getReviewsFromUserValidation.js'
import { validateUserPlaces } from '../validators/userOpsValidators/getPlacesFromUserValidation.js'
import { validateUserRoutes } from '../validators/userOpsValidators/getRoutesFromUserValidation.js'

//User information update imports
import { updateUsername } from '../controllers/usersControllers/updateUsername.js'
import { updatePassword } from '../controllers/usersControllers/updatePassword.js'
import { updateAvatar } from '../controllers/usersControllers/updateAvatar.js'
import { updateCover } from '../controllers/usersControllers/updateCover.js'

//User information update validation imports
import { validateUsernameUpdate } from '../validators/usersValidators/updateUsernameValidation.js'
import { validatePasswordUpdate } from '../validators/usersValidators/updatePasswordValidation.js'
import { validateAvatarUpdate } from '../validators/usersValidators/updateAvatarValidation.js'
import { validateCoverUpdate } from '../validators/usersValidators/updateCoverValidation.js'

//Rate limiter imports
import { getUsersLimiter } from '../middlewares/rate-limiter.js'
import { userSignupLimiter } from '../middlewares/rate-limiter.js'
import { getUserLimiter } from '../middlewares/rate-limiter.js'
import { updateUserLimiter } from '../middlewares/rate-limiter.js'
import { getUserOpsLimiter } from '../middlewares/rate-limiter.js'

//Authentication import
import { verifyToken } from '../middlewares/authentication.js'

const router = express.Router()

const maxSize = 0.5 * 1024 * 1024 //Max size on avatar and cover images 512kb.

const upload = multer({
  storage: multer.memoryStorage(),
  limits: { fileSize: maxSize },
})

//To be deprecated (Not public information about users will be provided.)

router.get('/', getUsersLimiter, getUsers)

router.get('/me', getUserLimiter, verifyToken, validateGetUser, getUser)

router.post('/', userSignupLimiter, validateUserSignup, saveUser)

// router.delete('/me', validateUserDeletion, deleteUser)

//User information update endpoints.

router.patch(
  '/me/password',
  updateUserLimiter,
  verifyToken,
  validatePasswordUpdate,
  updatePassword
)

router.patch(
  '/me/username',
  updateUserLimiter,
  verifyToken,
  validateUsernameUpdate,
  updateUsername
)

router.patch(
  '/me/avatar',
  updateUserLimiter,
  verifyToken,
  upload.single('avatar'),
  validateAvatarUpdate,
  updateAvatar
)

router.patch(
  '/me/cover',
  updateUserLimiter,
  verifyToken,
  upload.single('cover'),
  validateCoverUpdate,
  updateCover
)

//User Ops controllers

router.get(
  '/me/likes',
  getUserOpsLimiter,
  verifyToken,
  validateUserLikes,
  getLikesByUser
)

router.get(
  '/me/reviews',
  getUserOpsLimiter,
  verifyToken,
  validateUserReviews,
  getReviewsByUser
)

router.get(
  '/me/places',
  getUserOpsLimiter,
  verifyToken,
  validateUserPlaces,
  getPlacesByUser
)

router.get(
  '/me/routes',
  getUserOpsLimiter,
  verifyToken,
  validateUserRoutes,
  getRoutesByUser
)

export { router as usersRouter }
