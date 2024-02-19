import app from './app'
import config from './config'

// Main Server
const bootstrap = () => {
  app.listen(config.port, () => {
    console.log(`server Is Run Successfully PORT NO- ${config.port}`)
  })
}

bootstrap()
