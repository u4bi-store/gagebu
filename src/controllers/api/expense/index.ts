import {Router} from 'express'
import {QueryCtrl, ShowCtrl, CreateCtrl, UpdateCtrl, DestroyCtrl} from './expense.ctrl'
import http from '../http';
import expenseService from '../../../services/expenseService'

const expenseRouter: Router = Router()

expenseRouter.get('/', http(new QueryCtrl({ expenseService })))
expenseRouter.get('/:id', http(new ShowCtrl({ expenseService })))
expenseRouter.post('/', http(new CreateCtrl({ expenseService })))
expenseRouter.put('/:id', http(new UpdateCtrl({ expenseService })))
expenseRouter.delete('/:id', http(new DestroyCtrl({ expenseService })))

export default expenseRouter