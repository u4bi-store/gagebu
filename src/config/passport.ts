import passport from 'passport'
import { Strategy as LocalStrategy } from 'passport-local'
import { Application } from 'express';
import {findUserByName} from '../services/userService'
import {User} from '../models/User'

const setupPassport = (app: Application) => {
  passport.serializeUser(function (user, done) {
    done(null, user);
  });

  passport.deserializeUser(function (user, done) {
    done(null, user);
  });

  passport.use(new LocalStrategy(
    function (username: string, password: string, done: Function) {
      findUserByName(username)
        .then((user: User | null) => {
          // todo password checking
          if (user && user.email === username) {
            return done(null, user)
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

export default setupPassport 
