import { Schema, model } from 'mongoose'
import { IUser, UserModel } from './auth.interface'

const userSchema = new Schema<IUser, UserModel>(
  {
    name: {
      type: String,
      required: [true, 'Name Is required'],
    },
    email: {
      type: String,
      required: [true, 'email Is required'],
    },
    role: {
      type: String,
      required: [true, 'Role Is required'],
      default: 'user',
    },
    username: {
      type: String,
      required: [true, 'Username Is required'],
    },
  },
  {
    timestamps: true,
    toJSON: {
      virtuals: true,
    },
  },
)

export const User = model<IUser, UserModel>('User', userSchema)
