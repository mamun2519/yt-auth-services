import express, { Application, Request, Response } from 'express'
import cors from 'cors'
import cookieParser from 'cookie-parser'
import { StatusCodes } from 'http-status-codes'
const app: Application = express()

//middleware
app.use([
  cors(),
  express.json(),
  cookieParser(),
  express.urlencoded({ extended: true }),
])

// application route

// api test
app.get('/health', (req: Request, res: Response) => {
  res.status(StatusCodes.OK).send('Server Is Run Successfully')
})

// root api
app.get('/', (req: Request, res: Response) => {
  res.status(StatusCodes.OK).send({ success: true, message: 'Server is run' })
})

export default app
