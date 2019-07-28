import {Router, Request, Response} from 'express'
import { DailyExpense } from 'server/models';

const router: Router = Router()

const expenses: DailyExpense[] = [
  {
    date: '2019-07-03(수)',
    amount: 4500,
    expenses: [
      {id: 5, text: '서브웨이', amount: 4500}
    ]
  }, 
  {
    date: '2019-07-02(화)',
    amount: 12000,
    expenses: [
      { id: 4, text: '커피', amount: 4000 },
      { id: 3, text: '돼지국밥', amount: 8000 }
    ]
  },
  {
    date: '2019-07-01(월)',
    amount: 9000,
    expenses: [
      { id: 2, text: '부식', amount: 8000 },
      { id: 1, text: '아이스크림', amount: 1000 }
    ]
  },
  {
    date: '2019-07-01(월)',
    amount: 9000,
    expenses: [
      { id: 2, text: '부식', amount: 8000 },
      { id: 1, text: '아이스크림', amount: 1000 }
    ]
  },
  {
    date: '2019-07-01(월)',
    amount: 9000,
    expenses: [
      { id: 2, text: '부식', amount: 8000 },
      { id: 1, text: '아이스크림', amount: 1000 }
    ]
  }
]

router.get('/', (req: Request, res: Response) => {
  res.json(expenses)
})

export default router