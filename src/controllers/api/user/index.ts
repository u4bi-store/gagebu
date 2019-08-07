import { Router } from "express";
import * as ctrl from './user.ctrl'

const userRouter = Router()

userRouter.use('/me', ctrl.me)

export default userRouter