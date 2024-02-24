import express from 'express'
import { FeedbackController } from './feedback.controller'
import ValidateRequestAPI from '../../middleware/ValidationRequest'
import { FeedbackValidation } from './feedback.validation'

const router = express.Router()
router.get('/', FeedbackController.insertFeedback)
router.get('/:id', FeedbackController.getFeedBackById)
router.delete('/:id', FeedbackController.deleteFeedback)
router.patch('/:id', FeedbackController.updateFeedbackById)
router.post(
  '/',
  ValidateRequestAPI(FeedbackValidation.FeedbackPostZodSchema),
  FeedbackController.insertFeedback,
)

export const FeedbackRoute = router
