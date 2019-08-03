import {Router} from 'express'
import expenseRouter from './expense'
import userRouter from './user'

const apiRouter = Router()

apiRouter.use('/expenses', expenseRouter)
apiRouter.use('/users', userRouter)

export default apiRouter
