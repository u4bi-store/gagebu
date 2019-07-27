import {Router, Request, Response} from 'express'
import { Expense } from '../../models';

const router: Router = Router()

const expenses: Expense[] = [
  {id: 2, text: '부식', amount: 8000},
  {id: 1, text: '아이스크림', amount: 1000}
]

router.get('/', (req: Request, res: Response) => {
  res.json(expenses)
})

export default router