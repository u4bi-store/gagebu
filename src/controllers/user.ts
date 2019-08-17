import {Request, Response, NextFunction} from 'express'
import passport from 'passport'
import {IVerifyOptions} from 'passport-local'
import Debug from 'debug'
const debug = Debug('gagebu:controllers:user')

export const getLogin = (req: Request, res: Response) => {
  if (req.user) {
    return res.redirect('/');
  }
  const error = req.flash('errors')
  
  debug(error)
  
  const { returnUrl } = req.query
  res.render('login', { 
    error, 
    returnUrl: returnUrl || '/' });
}

export const postLogin = (req: Request, res: Response, next: NextFunction) => {
  debug('postLogin', req.body)
  const returnUrl = req.body.returnUrl || '/';

  passport.authenticate('local', (err: Error, user: any, info: IVerifyOptions) => {
    if (err) { return next(err); }
    
    if (!user) {
      req.flash('errors', info.message)
      return res.redirect(`/login?returnUrl=${encodeURIComponent(returnUrl)}`);
    }
    
    req.logIn(user, (err) => {
      if (err) return next(err);
      res.redirect(returnUrl);
    })
  })(req, res, next)
}

export const getProfile = (req: Request, res: Response) => {
  res.json({ user: req.user })
}

export const logout = (req: Request, res: Response, next: NextFunction) => {
  req.logout()
  res.redirect('/')
}
