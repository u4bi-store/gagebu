import passport from 'passport'
import { Strategy as LocalStrategy } from 'passport-local'
import { Application } from 'express';

const setupPassport = (app: Application) => {
  passport.serializeUser(function (user, done) {
    done(null, user);
  });

  passport.deserializeUser(function (user, done) {
    done(null, user);
  });

  passport.use(new LocalStrategy(
    function (username: string, password: string, done: Function) {
      // todo Users 서비스 대체 
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

  app.use(passport.initialize());
  app.use(passport.session());
}

export default setupPassport 
