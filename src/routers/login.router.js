import express from 'express'
import { validateUserLogin } from '../validators/loginValidators/loginValidation.js'
import { loginUser } from '../controllers/loginControllers/userLogin.js'
import { verifyToken } from '../middlewares/authentication.js'
import { userLoginLimiter } from '../middlewares/rate-limiter.js'

const router = express.Router()

//Test route for protected routes.

//Crear el lugar
router.get('/', verifyToken, (req, res) => {
  res.send('Welcome to the protected test route bro.')
})

router.post('/', userLoginLimiter, validateUserLogin, loginUser)

export { router as loginRouter }
