import express from 'express'
import { UserController } from './user.controller'

const router = express.Router()
router.get('/all-user', UserController.getAllUser)
router.get('/:email', UserController.getUserByEmail)

router.get('/:id', UserController.getUserById)
router.delete('/:id', UserController.deletedUser)

export const UserRoute = router
