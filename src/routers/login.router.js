import express from 'express'

const router = express.Router()

router.get('/', (req, res) => {
  res.send('Login completed GET.')
})

router.post('/', (req, res) => {
  res.send('Login completed POST.')
})

export { router as loginRouter }
