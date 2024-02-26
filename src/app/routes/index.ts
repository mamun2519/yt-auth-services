import express from 'express'
import { AuthRoute } from '../modules/auth/auth.route'
import { UserRoute } from '../modules/user/user.route'
import { FeedbackRoute } from '../modules/feedback/feedback.route'
const router = express.Router()

const moduleRoutes = [
  {
    path: '/auth',
    route: AuthRoute,
  },
  {
    path: '/user',
    route: UserRoute,
  },
  {
    path: '/feedback',
    route: FeedbackRoute,
  },
]

moduleRoutes.forEach(route => router.use(route.path, route.route))
export const ApplicationRootRoute = router
