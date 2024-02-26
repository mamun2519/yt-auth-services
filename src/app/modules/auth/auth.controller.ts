import { Request, Response } from 'express'
import catchAsync from '../../../shared/catchAsynFn'
import config from '../../../config'
import { StatusCodes } from 'http-status-codes'
import sendResponse from '../../../shared/sendResponse'
import { AuthService } from './auth.services'

const signupUser = catchAsync(async (req: Request, res: Response) => {
  const result = await AuthService.signupUserIntoDB(req.body)
  const { user, token } = result

  //set refresh token into cookies
  const cookieOptions = {
    secure: config.env === 'production',
    httpOnly: true,
  }
  res.cookie('refreshToken', token.refreshToken, cookieOptions)
  sendResponse(res, {
    statusCode: StatusCodes.OK,
    success: true,
    message: 'Signin Successfully!',
    data: {
      user,
      token: token,
    },
  })
})

export const AuthController = {
  signupUser,
}
