import { Expense } from '../models/Expense';
import { Order } from 'sequelize/types';

const expenseService = {
  async query (limit: number, offset: number, order: Order = [['date', 'DESC']]): 
  Promise<Expense[]> {
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
  }
}

export default expenseService
