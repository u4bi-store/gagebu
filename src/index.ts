import path from 'path'
import express from 'express'
import morgan from 'morgan'
import session from 'express-session';
import {isAuthenticated, init as initPassport} from './config/passport'
import apiRouter from './controllers/api'
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
  secret: 'cats',
  resave: true,
  saveUninitialized: true,
 })
);
app.use(flash());

initPassport(app)

import * as user from './controllers/user'
import * as home from './controllers/home'

app.get('/login', user.getLogin)
app.post('/login', user.postLogin)
app.get('/logout', user.logout)
app.get('/profile', isAuthenticated, user.getProfile)

app.use('/api', isAuthenticated, apiRouter)

app.get('/', home.index)
app.get('/*', home.notFound)


export default app
