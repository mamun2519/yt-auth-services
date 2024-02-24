import { SortOrder } from 'mongoose'
import { paginationHelpers } from '../../../helper/paginationHelper'
import { IPaginationOptions } from '../../../interface/pagination'
import { feedBackSearchableFields } from './feedback.constant'
import { IFeedBack, IFeedbackFilters } from './feedback.interface'
import { Feedback } from './feedback.model'
import { IGenericResponse } from '../../../interface/common'

const insertFeedbackIntoDB = async (data: IFeedBack): Promise<IFeedBack> => {
  const result = await Feedback.create(data)
  return result
}

const getAllFeedbackFromDB = async (
  filters: IFeedbackFilters,
  paginationOptions: IPaginationOptions,
): Promise<IGenericResponse<IFeedBack[]>> => {
  const { searchTerm, ...filtersData } = filters
  const { page, limit, skip, sortBy, sortOrder } =
    paginationHelpers.calculatePagination(paginationOptions)

  const andConditions = []
  // Search needs $or for searching in specified fields
  if (searchTerm) {
    andConditions.push({
      $or: feedBackSearchableFields.map(field => ({
        [field]: {
          $regex: searchTerm,
          $options: 'i',
        },
      })),
    })
  }
  // Filters needs $and to fullfill all the conditions
  if (Object.keys(filtersData).length) {
    andConditions.push({
      $and: Object.entries(filtersData).map(([field, value]) => ({
        [field]: value,
      })),
    })
  }

  const sortConditions: { [key: string]: SortOrder } = {}
  if (sortBy && sortOrder) {
    sortConditions[sortBy] = sortOrder
  }
  const whereConditions =
    andConditions.length > 0 ? { $and: andConditions } : {}

  const result = await Feedback.find(whereConditions).skip(skip).limit(limit)
  const total = await Feedback.countDocuments(whereConditions)
  return {
    meta: {
      page,
      limit,
      total,
    },
    data: result,
  }
}
const getFeedBackByIdFromDB = async (id: string): Promise<IFeedBack | null> => {
  const result = await Feedback.findById(id)
  return result
}

const updateFeedbackByIdIntoDB = async (
  id: string,
  data: Partial<IFeedBack>,
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
): Promise<IFeedBack | null | any> => {
  const result = await Feedback.updateOne({ _id: id }, data, { new: true })
  return result
}
// eslint-disable-next-line @typescript-eslint/no-explicit-any
const deleteFeedbackFromDB = async (id: string): Promise<any> => {
  const result = await Feedback.deleteOne({ _id: id })
  return result
}

export const FeedbackService = {
  insertFeedbackIntoDB,
  getAllFeedbackFromDB,
  getFeedBackByIdFromDB,
  updateFeedbackByIdIntoDB,
  deleteFeedbackFromDB,
}
