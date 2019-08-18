import path from 'path'
import express from 'express'
import morgan from 'morgan'
import session from 'express-session';
import {isAuthenticated, init as initPassport} from './config/passport'
import apiRouter from './controllers/api'
import authRouter from './controllers/auth'
import flash from 'express-flash'

const debug = require('debug')('gagebu:app')

const app: express.Application = express()
const env: string = process.env.NODE_ENV || 'development'
const pkg = require(path.resolve(__dirname, '../package.json'))

app.set('view engine', 'pug');
app.set('views', 'src/views')
if (env === 'development') app.use(morgan('dev'))
app.use('/assets', express.static(path.join(__dirname, pkg.assetPath)))
app.use(express.json())
app.use(express.urlencoded({ extended: true }))
app.use(session({ 
  secret: 'cats', // todo env
  resave: true,
  saveUninitialized: true,
 })
);
app.use(flash()); 

initPassport(app)

app.use('/api', isAuthenticated, apiRouter)
app.use('/auth', authRouter)

export default app
