import { Model } from 'mongoose'

export type IFeedBack = {
  reason: string
  email: string
  massage: string
  status: string
}

export type FeedbackModel = Model<IFeedBack>

export type IFeedbackFilters = {
  searchTerm?: string
  reason?: string
  email?: string
  status?: string
}
