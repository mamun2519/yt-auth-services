import { IUser, IUserResponse } from './auth.interface'
import { User } from './auth.model'
import { userNameGenerator } from '../../../utils/genarateRandomUser'
import { jwtHelpers } from '../../../helper/jwtHelper'
import config from '../../../config'
import { Secret } from 'jsonwebtoken'

const signupUserIntoDB = async (data: IUser): Promise<IUserResponse> => {
  const isExistUser = await User.findOne({ email: data.email })
  if (isExistUser) {
    // throw new API_Error(StatusCodes.BAD_REQUEST, 'User All Ready Exist')
    const accessToken = jwtHelpers.createToken(
      {
        userId: isExistUser._id,
        role: isExistUser.role,
        email: isExistUser.email,
      },
      config.jwt.secret_token as Secret,
      config.jwt.expire_in as string,
    )
    return {
      user: isExistUser,
      token: {
        accessToken,
      },
    }
  }
  const userName = userNameGenerator(data.name)
  data.username = userName

  const result = await User.create(data)
  // generate JWT Token
  const accessToken = jwtHelpers.createToken(
    { userId: result.id, role: result.role, email: result.email },
    config.jwt.secret_token as Secret,
    config.jwt.expire_in as string,
  )
  // generate Refresh Token
  const refreshToken = jwtHelpers.createToken(
    { userId: result._id, role: result.role, email: result.email },
    config.jwt.refresh_token as Secret,
    config.jwt.refresh_expire_in as string,
  )

  return {
    user: result,
    token: {
      accessToken,
      refreshToken,
    },
  }
}

export const AuthService = { signupUserIntoDB }
