import express from 'express'
import { validateUserLogin } from '../validators/loginValidators/loginValidation.js'
import { loginUser } from '../controllers/loginControllers/userLogin.js'
import { verifyToken } from '../middlewares/authentication.js'

const router = express.Router()

//Test route for protected routes.
router.get('/', verifyToken, (req, res) => {
  res.send('Welcome to the protected route bro.')
})

router.post('/', validateUserLogin, loginUser)

export { router as loginRouter }
