import {Router} from 'express'
import * as ctrl from './expense.ctrl'
import http2 from '../http2';
import expenseService from '../../../services/expenseService'

const expenseRouter: Router = Router()

expenseRouter.get('/', http2(new ctrl.QueryController({ expenseService })))
expenseRouter.get('/:id', ctrl.show)
expenseRouter.post('/', ctrl.create) 
expenseRouter.put('/:id', ctrl.update)
expenseRouter.delete('/:id', ctrl.destory)

export default expenseRouter