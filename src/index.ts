import path from 'path'
import express, { Request, Response, NextFunction } from 'express'
import morgan from 'morgan'
import session from 'express-session';
import passport from 'passport';
import bodyParser from 'body-parser'
// import * as passportConfig from './config/passport'
import apiRouter from './controllers/api'
import homeRouter from './controllers/home'
import authRouter from './controllers/auth';
import { IVerifyOptions } from 'passport-local';
import flash from 'express-flash'
import { User } from './models/User';
import passportLocal from "passport-local";
import { findUserByName } from './services/userService';
const LocalStrategy = passportLocal.Strategy;

const debug = require('debug')('gagebu:app')

const app: express.Application = express()
const env: string = process.env.NODE_ENV || 'development'
const pkg = require(path.resolve(__dirname, '../package.json'))


passport.serializeUser<any, any>((user, done) => {
  debug('serializeUser')
  done(null, user.id);
});

passport.deserializeUser((id: number, done) => {
  debug('deserializeUser')
  User.findByPk(id).then((user: User | null) => {
    done(null, user);
  }).catch((err: any) => {
    done(err)
  })
});

passport.use(new LocalStrategy(
  (username: string, password: string, done: Function) => {
    findUserByName(username)
      .then((user: User | null) => {
        if (!user) {
          return done(undefined, false, { message: `Email ${username} not found.` });
        }

        // todo password checking
        if (user.email === username) {
          return done(null, user);
        }

        done(null, false)
      })
      .catch(err => {
        done(err)
      })
  }
));


app.set('view engine', 'pug');
app.set('views', 'src/views')

if (env === 'development') {
  app.use(morgan('dev'))
}

app.use('/assets', express.static(path.join(__dirname, pkg.assetPath)))

// todo 환경변수로 분리 
app.use(express.json())
app.use(express.urlencoded({ extended: true }))
app.use(session({ 
  secret: 'cats',
  resave: true,
  saveUninitialized: true,
 }));
app.use(passport.initialize());
app.use(passport.session());
app.use(flash());

app.get('/login', (req: Request, res: Response) => {
  if (req.user) {
    return res.redirect('/login-done');
  }
  const error = req.flash('errors')
  debug(error)
  res.render('login', {error});
})
app.post('/login', (req: Request, res: Response, next: NextFunction) => {
  debug('postLogin', req.body)
  passport.authenticate('local', (err: Error, user: any, info: IVerifyOptions) => {
    debug(err, user, info)
    if (err) { return next(err); }
    if (!user) {
      req.flash('errors', info.message)
      return res.redirect('/login');
    }
    req.logIn(user, (err) => {
      if (err) return next(err);
      res.redirect('/login-done');
    })
  })(req, res, next)
})
app.get('/login-done', (req: Request, res: Response) => {
  res.json({user: req.user})
})

// app.use('/auth', authRouter)
// app.use('/api', passportConfig.isAuthenticated, apiRouter)
// app.use('/', homeRouter)

export default app
