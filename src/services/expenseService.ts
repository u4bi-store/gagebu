import { Expense } from '../models/Expense';
import { Order } from 'sequelize/types';

const expenseService = {
  async query(limit: number, offset: number, order: Order = [['date', 'DESC']]) {
    const expenses: Expense[] = await Expense.findAll({
      limit,
      offset,
      order,
    })
    return expenses
  }
}

export default expenseService
