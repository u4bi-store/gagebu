import { Request, Response, NextFunction} from 'express'
import passport from 'passport'

const DEFAULT_REDIRECT_PATH = `/login-done`

export const loginPage = (req: Request, res: Response) => {
  res.render('login', { 
    returnUrl: req.query.returnUrl || DEFAULT_REDIRECT_PATH
  })
};

export const login = (req: Request, res: Response, next: NextFunction) => {
  passport.authenticate('local', (err, user, info) => {
    if (err) return next(err);

    const { returnUrl } = req.body
    if (!user) {
      const url = `/auth/login?returnUrl=${encodeURIComponent(returnUrl || DEFAULT_REDIRECT_PATH)}`
      return res.redirect(url)
    }

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

export const logoutPage = (req: Request, res: Response) => {
  res.json(req.user)
}
