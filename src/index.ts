import path from 'path'
import express from 'express'
import morgan from 'morgan'
import session from 'express-session';
import setupPassport from './config/passport'
import apiRouter from './controllers/api'
import homeRouter from './controllers/home'
import authRouter from './controllers/auth';
import { isAuthenticated } from './services/authService'

const app: express.Application = express()
const env: string = process.env.NODE_ENV || 'development'
const pkg = require(path.resolve(__dirname, '../package.json'))

app.set('view engine', 'pug');
app.set('views', 'src/views')

if (env === 'development') {
  app.use(morgan('dev'))
}

app.use('/assets', express.static(path.join(__dirname, pkg.assetPath)))

// todo 환경변수로 분리 
app.use(session({ secret: 'cats' }));
app.use(express.json())
app.use(express.urlencoded({ extended: true }))

setupPassport(app);

app.use('/auth', authRouter)
app.use('/api', isAuthenticated(), apiRouter)
app.use('/', homeRouter)

export default app
