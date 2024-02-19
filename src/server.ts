import app from './app'
import config from './config'
import mongoose from 'mongoose'
// Main Server
const bootstrap = async () => {
  try {
    await mongoose.connect(config.database_url as string)
    console.log('database connect')
    app.listen(config.port, () => {
      console.log(`server Is Run Successfully PORT NO- ${config.port}`)
    })
  } catch (error) {
    console.log(error)
  }
}

bootstrap()
