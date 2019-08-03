import { Router } from "express";
import * as ctrl from './home.ctrl'

const homeRouter = Router()

homeRouter.use('/', ctrl.index)
homeRouter.use('/*', ctrl.all)

export default homeRouter
