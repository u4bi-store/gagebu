import { Request, Response } from 'express'
import { Expense } from '../../../models/Expense';
import expenseService from '../../../services/expenseService';
import {Controller} from '../http2';

interface QueryControllerServices {
  expenseService: typeof expenseService
}

export class QueryController extends Controller<QueryControllerServices> {
  constructor(services: QueryControllerServices) {
    super(services)
  }
  async run(options: any) {
    const limit = parseInt(options.limit || '20', 10)
    const offset = parseInt(options.offset || '0', 10)

    const {expenseService} = this.services
    return await expenseService.query(limit, offset)
  }
}

export const show = async (req: Request, res: Response) => {
  const id = parseInt(req.params.id || '0', 10)
  const expense: Expense | null = await Expense.findOne({
    where: { id: id }
  })
  if (!expense) return res.sendStatus(404)

  res.json(expense)
}

export const create = async (req: Request, res: Response) => {
  const { text } = req.body
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
}

export const update = async (req: Request, res: Response) => {
  const id = req.params.id
  if (!id) return res.sendStatus(404)

  const { amount, text, date } = req.body

  try {
    const expense = await Expense.update({
      amount,
      text,
      date,
    }, { where: { id } })
    res.json(expense)
  } catch {
    res.sendStatus(500)
  }
}

export const destory = async (req: Request, res: Response) => {
  const id = req.params.id
  if (!id) return res.sendStatus(404)

  await Expense.destroy({ where: { id } })
  res.sendStatus(204)
}