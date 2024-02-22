import { NextFunction, Request, Response } from 'express'
import API_Error from '../../error/apiError'
import { StatusCodes } from 'http-status-codes'
import { jwtHelpers } from '../../helper/jwtHelper'
import config from '../../config'
import { Secret } from 'jsonwebtoken'
//Auth Guard
const AuthGuard =
  (...requiredRoles: string[]) =>
  async (req: Request, res: Response, next: NextFunction) => {
    try {
      const token = req.headers.authorization
      if (!token) {
        throw new API_Error(StatusCodes.UNAUTHORIZED, 'You are not authorized')
      }
      // verified token
      let verifiedUser = null
      verifiedUser = jwtHelpers.verifyToken(
        token,
        config.jwt.secret_token as Secret,
      )
      req.user = verifiedUser // role  , userid

      // role diye guard korar jnno
      if (requiredRoles.length && !requiredRoles.includes(verifiedUser.role)) {
        throw new API_Error(StatusCodes.FORBIDDEN, 'Forbidden')
      }
      next()
    } catch (error) {
      console.log(error)
      next(error)
    }
  }

export default AuthGuard
