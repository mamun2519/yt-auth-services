/* eslint-disable @typescript-eslint/no-explicit-any */
import { SortOrder } from 'mongoose'
import { paginationHelpers } from '../../../helper/paginationHelper'
import { IPaginationOptions } from '../../../interface/pagination'
import { IUser } from '../auth/auth.interface'
import { User } from '../auth/auth.model'
import { userSearchableFields } from './user.constant'
import { IUserFilters } from './user.interface'
import { IGenericResponse } from '../../../interface/common'

const getAllUserFromDB = async (
  filters: IUserFilters,
  paginationOptions: IPaginationOptions,
): Promise<IGenericResponse<IUser[]>> => {
  const { searchTerm, ...filtersData } = filters
  const { page, limit, skip, sortBy, sortOrder } =
    paginationHelpers.calculatePagination(paginationOptions)

  const andConditions = []
  // Search needs $or for searching in specified fields
  if (searchTerm) {
    andConditions.push({
      $or: userSearchableFields.map(field => ({
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

  const result = await User.find(whereConditions).skip(skip).limit(limit)

  const total = await User.countDocuments(whereConditions)

  return {
    meta: {
      page,
      limit,
      total,
    },
    data: result,
  }
}

const getUserByIdFromDB = async (id: string): Promise<IUser | null> => {
  return User.findById(id)
}

const deleteUserByIdIntoDB = async (_id: string): Promise<any> => {
  const deletedUser = await User.deleteOne({ _id })
  return deletedUser
}

export const UserService = {
  getAllUserFromDB,
  getUserByIdFromDB,
  deleteUserByIdIntoDB,
}
