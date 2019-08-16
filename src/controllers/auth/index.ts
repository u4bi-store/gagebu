import { Router } from 'express'
import * as authCtrl from './auth.ctrl'

const authRouter = Router()

authRouter.get('/login', authCtrl.loginPage);
authRouter.post('/login', authCtrl.login);
authRouter.get('/logout', authCtrl.logout)
authRouter.get('/login-done', authCtrl.loginDone)

export default authRouter;
