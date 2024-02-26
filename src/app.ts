import express, { Application, NextFunction, Request, Response } from 'express'
import cors from 'cors'
import cookieParser from 'cookie-parser'
import { StatusCodes } from 'http-status-codes'
import globalErrorHandler from './app/middleware/globalErrorHandler'
import { ApplicationRootRoute } from './app/routes'
const app: Application = express()

//middleware
app.use([
  cors(),
  express.json(),
  cookieParser(),
  express.urlencoded({ extended: true }),
])

// application routes
app.use('/api/v1', ApplicationRootRoute)
// api test
app.get('/health', (req: Request, res: Response) => {
  res.status(StatusCodes.OK).send('Server Is Run Successfully')
})
// global error Handler
app.use(globalErrorHandler)
// root api
app.get('/', (req: Request, res: Response) => {
  res.status(StatusCodes.OK).send({ success: true, message: 'Server is run' })
})
// Not Found Route
app.use((req: Request, res: Response, next: NextFunction) => {
  res.status(300).json({
    success: false,
    message: 'Not Found',
    errorMessages: [{ path: req.originalUrl, message: 'API Not Found' }],
  })
  next()
})
export default app
