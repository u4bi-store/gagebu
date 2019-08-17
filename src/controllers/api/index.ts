import {Router} from 'express'
import expenseRouter from './expense'

const apiRouter = Router()

apiRouter.use('/expenses', expenseRouter)

export default apiRouter
