import passport from 'passport'
// import { Strategy as LocalStrategy } from 'passport-local'
import passportLocal from "passport-local";
const LocalStrategy = passportLocal.Strategy;
import { Request, Response, NextFunction } from 'express';
import {findUserByName} from '../services/userService'
import {User} from '../models/User'

const debug = require('debug')('gagebu:passport')

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

debug('init')

passport.use(new LocalStrategy(
  {},
  (username: string, password: string, done: Function) => {
    debug('LocalStrategy')
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
))

export const isAuthenticated = (req: Request, res: Response, next: NextFunction) => {
  debug('isAuthenticated', req.isAuthenticated())
  if (req.isAuthenticated()) {
    return next();
  }
  res.redirect("/auth/login");
};
