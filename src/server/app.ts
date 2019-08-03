import path from 'path'
import express from 'express'
import morgan from 'morgan'
import apiRouter from './controllers/api'
import homeRouter from './controllers/home'

const app: express.Application = express()
const env: string = process.env.NODE_ENV || 'development'
const development = env === 'development'
const pkg = development 
  ? require(path.resolve(__dirname, '../../package.json'))
  : require(path.resolve(__dirname, '../package.json'))

if (development) {
  app.use(morgan('dev'))
}

app.use(express.json())
app.use(express.urlencoded({ extended: true }))

app.use('/assets', express.static(path.join(__dirname, pkg.assetPath)))
app.use('/api', apiRouter)
app.use('/', homeRouter)

export default app
