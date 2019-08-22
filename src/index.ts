import path from 'path'
import express from 'express'
import morgan from 'morgan'
import session from 'express-session';
import * as passport from './config/passport'
import apiRouter from './controllers/api'
import authRouter from './controllers/auth'

const app: express.Application = express()
const env: string = process.env.NODE_ENV || 'development'
const pkg = require(path.resolve(__dirname, '../package.json'))

if (env === 'development') {
  app.use(morgan('dev'))
}

app.use('/assets', express.static(path.join(__dirname, pkg.assetPath)))
app.use(express.json())
app.use(express.urlencoded({ extended: true }))
app.use(session({ 
  secret: 'cats', // todo env
  resave: true,
  saveUninitialized: true,
 })
);

passport.init(app)

app.use('/api', passport.isAuthenticated, apiRouter)
app.use('/auth', authRouter)

export default app
