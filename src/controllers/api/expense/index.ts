import {Router} from 'express'
import {QueryController, ShowController} from './expense.ctrl'
import http from '../http';
import expenseService from '../../../services/expenseService'

const expenseRouter: Router = Router()

expenseRouter.get('/', http(new QueryController({ expenseService })))
expenseRouter.get('/:id', http(new ShowController({ expenseService })))
// expenseRouter.post('/', ctrl.create) 
// expenseRouter.put('/:id', ctrl.update)
// expenseRouter.delete('/:id', ctrl.destory)

export default expenseRouter