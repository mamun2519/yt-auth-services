import express from 'express'
import { FeedbackController } from './feedback.controller'

const router = express.Router()
router.get('/', FeedbackController.insertFeedback)
router.get('/:id', FeedbackController.getFeedBackById)
router.delete('/:id', FeedbackController.deleteFeedback)
router.patch('/:id', FeedbackController.updateFeedbackById)
router.post('/', FeedbackController.insertFeedback)

export const FeedbackRoute = router
