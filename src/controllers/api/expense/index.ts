import {Router} from 'express'
import * as ctrl from './expense.ctrl'

const expenseRouter: Router = Router()

expenseRouter.get('/', ctrl.query)
expenseRouter.get('/:id', ctrl.show)
expenseRouter.post('/', ctrl.create) 
expenseRouter.put('/:id', ctrl.update)
expenseRouter.delete('/:id', ctrl.destory)

export default expenseRouter