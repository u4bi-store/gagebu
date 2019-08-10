import express, { Router } from "express";
import * as ctrl from './user.ctrl'

const userRouter = Router()

userRouter.get('/me', ctrl.me)

export default userRouter