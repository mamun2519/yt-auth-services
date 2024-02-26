import { Model } from 'mongoose'

export type IUser = {
  name: string
  email: string
  role: string
  username: string
}

export type UserModel = Model<IUser>

export type IUserResponse = {
  user: IUser
  token: {
    accessToken?: string
    refreshToken?: string
  }
}
