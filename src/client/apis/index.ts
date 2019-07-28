import superagent from 'superagent'
import { Expense } from 'server/models';

export const fetchExpenseList = () => {
  return superagent.get('/api/expenses')
    .then(res => res.body)
}

export const addExpense = (expense: Expense) => {
  return superagent.post('/api/expenses')
    .send(expense)
    .then(res => res.body)
}