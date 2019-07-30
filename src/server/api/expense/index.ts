import {Router, Request, Response} from 'express'
import { Expense } from 'server/DTOModels/index';

const router: Router = Router()

const expenses: Expense[] = [
  { id: 9, amount: 4500, text: '서브웨이', date: '2019-07-05T10:00:00.000Z' },
  { id: 8, amount: 4000, text: '커피', date: '2019-07-04T10:00:00.000Z' },
  { id: 7, amount: 8000, text: '돼지국밥', date: '2019-07-04T10:00:00.000Z' },
  { id: 6, amount: 8000, text: '부식', date: '2019-07-04T10:00:00.000Z' },
  { id: 5, amount: 1000, text: '아이스크림', date: '2019-07-03T10:00:00.000Z' },
  { id: 4, amount: 8000, text: '부식', date: '2019-07-03T10:00:00.000Z' },
  { id: 3, amount: 1000, text: '아이스크림', date: '2019-07-03T10:00:00.000Z' },
  { id: 2, amount: 8000, text: '부식', date: '2019-07-02T10:00:00.000Z' },
  { id: 1, amount: 1000, text: '아이스크림', date: '2019-07-01T10:00:00.000Z' },
]

router.get('/', (req: Request, res: Response) => {
  res.json(expenses)
})

router.post('/', (req: Request, res: Response) => {
  const {text} = req.body
  const amount = parseInt(req.body.amount, 10)

  if (!text || isNaN(amount)) {
    return res.status(400)
  }

  const expense: Expense = {
    id: Date.now(),
    amount, 
    text, 
    date: new Date().toISOString()
  }
  expenses.unshift(expense)

  res.status(201).json(expense)
}) 

export default router