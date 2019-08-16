import { Request, Response, NextFunction} from 'express'
import passport from 'passport'
import { User } from 'models/User';
import { IVerifyOptions } from 'passport-local';
const debug = require('debug')('gagebu:auth.ctrl')

const DEFAULT_REDIRECT_PATH = `/login-done`

export const loginPage = (req: Request, res: Response) => {
  res.render('login', { 
    returnUrl: req.query.returnUrl || DEFAULT_REDIRECT_PATH
  })
};

export const login = (req: Request, res: Response, next: NextFunction) => {
  debug('login start')

  passport.authenticate('local', (err: Error, user: User, info: IVerifyOptions) => {
    if (err) return next(err);

    const { returnUrl } = req.body
    debug('user', user)
    if (!user) {
      const url = `/auth/login?returnUrl=${encodeURIComponent(returnUrl || DEFAULT_REDIRECT_PATH)}`
      return res.redirect(url)
    }
    
    debug('userFound', user)

    req.logIn(user, err => {
      if (err) return next(err);
      return res.redirect(returnUrl || DEFAULT_REDIRECT_PATH);
    });
  })(req, res, next)
};

export const logout = (req: Request, res: Response) => {
  req.logout()
  res.send('logout done')
};

export const loginDone = (req: Request, res: Response) => {
  res.json({ user: req.user })
}
