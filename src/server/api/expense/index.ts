import {Router, Request, Response} from 'express'
import { Expense } from '../../models/Expense';

const router: Router = Router()

router.get('/', async (req: Request, res: Response) => {
  const offset = parseInt(req.query.offset || '0', 10)
  const limit = parseInt(req.query.limit || '20', 10)

  const expenses: Expense[] = await Expense.findAll({
    limit,
    offset,
    order: [['date', 'DESC']]
  })
  res.json(expenses)
})

router.get('/:id', async (req: Request, res: Response) => {
  const id = parseInt(req.params.id || '0', 10)
  const expense: Expense | null = await Expense.findOne({
    where: {id: id}
  })
  if (!expense) return res.sendStatus(404)
  
  res.json(expense)
})

router.post('/', async (req: Request, res: Response) => {
  const {text} = req.body
  const amount = parseInt(req.body.amount, 10)

  if (!text || isNaN(amount)) {
    return res.status(400)
  }

  const expense: Expense = new Expense({
    amount, 
    text, 
    date: new Date(),
    userId: 1,
  })
  await expense.save()
  res.status(201).json(expense)
}) 

router.put('/:id', async (req: Request, res: Response) => {
  const id = req.params.id
  if (!id) return res.sendStatus(404)

  const {amount, text, date} = req.body

  try {
    const expense = await Expense.update({
      amount, 
      text, 
      date,
    }, {where: {id}})
    res.json(expense)
  } catch {
    res.sendStatus(500)
  }
})

router.delete('/:id', async (req: Request, res: Response) => {
  const id = req.params.id
  if (!id) return res.sendStatus(404)

  await Expense.destroy({ where: {id}})
  res.sendStatus(204)

})

export default router