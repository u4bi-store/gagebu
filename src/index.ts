import path from 'path'
import express, {Request, Response, NextFunction} from 'express'
import morgan from 'morgan'
import apiRouter from './controllers/api'
import homeRouter from './controllers/home'

import session from 'express-session';
import passport from 'passport'
import { Strategy as LocalStrategy } from 'passport-local'


passport.serializeUser(function (user, done) {
  done(null, user);
});

passport.deserializeUser(function (user, done) {
  done(null, user);
});

passport.use(new LocalStrategy(
  function(username: string, password: string, done: Function) {
    const allowedUser = {
      username: 'test',
      password: 'test1234',
    }
    if (username === allowedUser.username && password === allowedUser.password) {
      return done(null, allowedUser)
    }
    done(null, false)
  }
))


const app: express.Application = express()
const env: string = process.env.NODE_ENV || 'development'
const pkg = require(path.resolve(__dirname, '../package.json'))

app.set('view engine', 'pug');
app.set('views', 'src/views')
if (env === 'development') {
  app.use(morgan('dev'))
}
app.use('/assets', express.static(path.join(__dirname, pkg.assetPath)))
app.use(session({ secret: 'cats' }));
app.use(express.json())
app.use(express.urlencoded({ extended: true }))
app.use(passport.initialize());
app.use(passport.session());


app.get('/login', (req: express.Request, res: express.Response) => {
  res.render('login', { returnUrl: req.query.returnUrl || '/login-done' })
})
app.post('/login', (req: Request, res: Response, next: NextFunction) => {
  passport.authenticate('local', (err, user, info) => {
    if (err) return next(err);

    const {returnUrl}  = req.body
    if (!user) return res.redirect(`/login?returnUrl=${encodeURIComponent(returnUrl || `/login-done`)}`)
    
    req.logIn(user, err => {
      if (err) return next(err); 
      return res.redirect(returnUrl || '/login-done');
    });
  })(req, res, next)
})
app.get('/logout', (req: express.Request, res: express.Response) => {
  req.logout()
  res.send('logout done')
})
app.get('/login-done', (req: express.Request, res: express.Response) => {
  res.json(req.user)
})

const isAuthenticated = () => (req: Request, res: Response, next: NextFunction): any => {
    if (req.user) return next()
    res.sendStatus(401);
  }

app.use('/api', isAuthenticated(), apiRouter)
app.use('/', homeRouter)

export default app
