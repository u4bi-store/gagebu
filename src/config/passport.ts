import passport from 'passport'
import { Strategy as LocalStrategy } from 'passport-local'
import { Request, Response, NextFunction, Application } from 'express';
import {User} from '../models/User'
import Debug from 'debug'

const debug = Debug('gagebu:passport')

export const init = (app: Application) => {
  debug('init')
  
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
      debug('LocalStrategy')

      User.findOne({where: {email: username}})
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
  ))

  app.use(passport.initialize());
  app.use(passport.session());
}

export const isAuthenticated = (req: Request, res: Response, next: NextFunction) => {
  debug('isAuthenticated', req.isAuthenticated())
  if (req.isAuthenticated()) {
    return next();
  }

  const returnUrl = encodeURIComponent(req.url)
  res.redirect(`/login?returnUrl=${returnUrl}`);
};
