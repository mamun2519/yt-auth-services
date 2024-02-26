import express from 'express'
import { AuthController } from './auth.controller'
import ValidateRequestAPI from '../../middleware/ValidationRequest'
import { AuthValidation } from './auth.validation'

const router = express.Router()

router.post(
  '/signin',
  ValidateRequestAPI(AuthValidation.singUpWithGoogleZodSchema),
  AuthController.signupUser,
)

export const AuthRoute = router
