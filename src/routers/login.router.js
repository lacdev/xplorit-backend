import express from 'express'

import { loginUser } from '../controllers/loginControllers/userLogin.js'
import { validateUserLogin } from '../validators/loginValidators/loginValidation.js'
import { verifyToken } from '../middlewares/authentication.js'
// import { userLoginLimiter } from '../middlewares/rate-limiter.js'

const router = express.Router()

//Main Login endpoint.

router.post('/', validateUserLogin, loginUser)
// userLoginLimiter,
//Test route for protected routes.

router.get('/', verifyToken, (req, res) => {
  res.send('Welcome to the protected test route bro.')
})

export { router as loginRouter }
