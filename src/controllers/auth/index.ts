import { Router } from 'express'
import * as authCtrl from './auth.ctrl'
import { isAuthenticated } from '../../config/passport';

const authRouter = Router()

authRouter.post('/login', authCtrl.login)
authRouter.post('/logout', isAuthenticated, authCtrl.logout)

export default authRouter;
