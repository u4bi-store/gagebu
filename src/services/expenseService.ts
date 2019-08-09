import { Expense } from '../models/Expense';
import { Order } from 'sequelize/types';

const expenseService = {
  async query (limit: number, offset: number, order: Order = [['date', 'DESC']]): 
  Promise<Expense[] | undefined> {
    return await Expense.findAll({
      limit,
      offset,
      order,
    })
  },

  async show (id: number): Promise<Expense | null> {
    return await Expense.findOne({
      where: { id }
    })
  },

  async create (amount: number, text: string, date: number, userId: number)
  : Promise<Expense | undefined> {
    const expense: Expense = new Expense({
      amount,
      text,
      date,
      userId,
    })
    await expense.save();
    return expense;
  },

  async update(id: number, amount: number, text: string, date: number): Promise<any> {
    const expense =  await Expense.update({
      amount,
      text,
      date,
    }, { where: { id } })
    return expense;
  },

  async destroy(id: number): Promise<void> {
    await Expense.destroy({ where: { id }})
    return 
  }
}

export default expenseService
