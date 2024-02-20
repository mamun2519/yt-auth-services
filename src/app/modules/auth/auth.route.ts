import express from 'express'
import { AuthController } from './auth.controller'

const router = express.Router()

router.post('/signin', AuthController.signupUser)

export const AuthRoute = router
