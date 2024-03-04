import { IUser, IUserResponse } from './auth.interface'
import { User } from './auth.model'
import { userNameGenerator } from '../../../utils/generateRandomUser'
import { singUpGenerateTokenUser } from './auth.utils'

const signupUserIntoDB = async (data: IUser): Promise<IUserResponse> => {
  const isExistUser = await User.findOne({ email: data.email })
  if (isExistUser) {
    const singUpUser = singUpGenerateTokenUser(isExistUser)
    return singUpUser
  }
  const userName = userNameGenerator(data.name)
  data.username = userName.replace(/\s+/g, '-')

  const result = await User.create(data)
  // generate Refresh Token
  const singUpUser = singUpGenerateTokenUser(result)
  return singUpUser
}

export const AuthService = { signupUserIntoDB }
