import globalErrorHandler from '../app/middleware/globalErrorHandler'
import { ApplicationRootRoute } from '../app/routes'
import express, { NextFunction, Request, Response } from 'express'
export const TestingApp = () => {
  const app = express()
  app.use(express.json())

  //middleware
  app.use([express.json()])

  // application routes
  app.use('/api/v1', ApplicationRootRoute)

  // global error Handler
  app.use(globalErrorHandler)
  // root api

  // Not Found Route
  app.use((req: Request, res: Response, next: NextFunction) => {
    res.status(300).json({
      success: false,
      message: 'Not Found',
      errorMessages: [{ path: req.originalUrl, message: 'API Not Found' }],
    })
    next()
  })
  return app
}

// eslint-disable-next-line no-undef
describe('My Utility Functions', () => {
  // eslint-disable-next-line no-undef
  it('should do something', () => {
    // Test case code here
  })
})
