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
import { validateUserSignup } from '../validators/usersValidators/saveUserValidation.js'
import { validateGetUser } from '../validators/usersValidators/getUserValidation.js'
// import { validateUserUpdate } from '../validators/usersValidators/updateUserValidation.js'
import { validateUserDeletion } from '../validators/usersValidators/deleteUserValidation.js'
import { validateUserLikes } from '../validators/userOpsValidators/getLikesFromUserValidation.js'
import { validateUserReviews } from '../validators/userOpsValidators/getReviewsFromUserValidation.js'
import { validateUserPlaces } from '../validators/userOpsValidators/getPlacesFromUserValidation.js'
import { validateUserRoutes } from '../validators/userOpsValidators/getRoutesFromUserValidation.js'
// import multer from 'multer'
// import { updateUserPassword } from '../controllers/usersControllers/updateUserPassword.js'
// import { validatePasswordUpdate } from '../validators/usersValidators/updatePasswordValidation.js'
// import { validateP}
// import { ApiError } from '../errors/ApiError.js'
// import { handleImagesArray } from '../middlewares/image-upload-handler.js'
import { validateUsernameUpdate } from '../validators/usersValidators/updateUsernameValidation.js'
import { updateUsername } from '../controllers/usersControllers/updateUsername.js'

const router = express.Router()

// const upload = multer()
// const maxSize = 0.2 * 1024 * 1024

// const userImagesUpdate = multer({
//   storage: multer.memoryStorage(),
//   limits: { fileSize: maxSize },
// }).array('images', 2)

// //User controllers
router.get('/', getUsers)
router.get('/:userId', validateGetUser, getUser)
router.post('/', validateUserSignup, saveUser)
router.delete('/:userId', validateUserDeletion, deleteUser)

// userImagesUpdate,
// userAvatarUpdate,
// userCoverUpdate,
// userImagesUpdate,

//User information update endpoints.
// router.patch('/:userId/password', validatePasswordUpdate, updatePassword)
// router.patch('/:userId/avatar', validateAvatarUpdate, updateAvatar)
// router.patch('/:userId/cover', validateCoverUpdate, updateCover)
router.patch('/:userId/username', validateUsernameUpdate, updateUsername)

//User Ops controllers
router.get('/:userId/likes', validateUserLikes, getLikesByUser)
router.get('/:userId/reviews', validateUserReviews, getReviewsByUser)
router.get('/:userId/places', validateUserPlaces, getPlacesByUser)
router.get('/:userId/routes', validateUserRoutes, getRoutesByUser)

export { router as usersRouter }
