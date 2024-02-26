import { Request, Response } from 'express'
import { paginationFields } from '../../../constants/pagination'
import catchAsync from '../../../shared/catchAsynFn'
import pick from '../../../shared/pick'
import { feedBackFilterableFields } from './feedback.constant'
import { FeedbackService } from './feedback.services'
import sendResponse from '../../../shared/sendResponse'
import { IFeedBack } from './feedback.interface'
import { StatusCodes } from 'http-status-codes'

const insertFeedback = catchAsync(async (req: Request, res: Response) => {
  const result = await FeedbackService.insertFeedbackIntoDB(req.body)
  sendResponse<IFeedBack>(res, {
    statusCode: StatusCodes.OK,
    success: true,
    message: 'Feedback Send successfully !',
    data: result,
  })
})

const getAllFeedback = catchAsync(async (req: Request, res: Response) => {
  const filters = pick(req.query, feedBackFilterableFields)
  const paginationOptions = pick(req.query, paginationFields)
  const result = await FeedbackService.getAllFeedbackFromDB(
    filters,
    paginationOptions,
  )
  sendResponse<IFeedBack[]>(res, {
    statusCode: StatusCodes.OK,
    success: true,
    message: 'All Feedback Fetch successfully !',
    meta: result.meta,
    data: result.data,
  })
})

const getFeedBackById = catchAsync(async (req: Request, res: Response) => {
  const result = await FeedbackService.getFeedBackByIdFromDB(req.params.id)
  sendResponse<IFeedBack>(res, {
    statusCode: StatusCodes.OK,
    success: true,
    message: 'Single Feedback Fetch successfully !',
    data: result,
  })
})

const updateFeedbackById = catchAsync(async (req: Request, res: Response) => {
  const result = await FeedbackService.updateFeedbackByIdIntoDB(
    req.params.id,
    req.body,
  )
  sendResponse<IFeedBack>(res, {
    statusCode: StatusCodes.OK,
    success: true,
    message: ' Feedback Update  successfully !',
    data: result,
  })
})

const deleteFeedback = catchAsync(async (req: Request, res: Response) => {
  const result = await FeedbackService.deleteFeedbackFromDB(req.params.id)
  sendResponse<IFeedBack>(res, {
    statusCode: StatusCodes.OK,
    success: true,
    message: 'Feedback delete successfully !',
    data: result,
  })
})

export const FeedbackController = {
  getAllFeedback,
  getFeedBackById,
  updateFeedbackById,
  deleteFeedback,
  insertFeedback,
}
