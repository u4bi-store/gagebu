import * as types from './types'
import { FetchExpenseListAction, AddExpenseAction } from 'client/reducers/expense';
import { Expense } from 'server/models';

export const fetchExpenseList = (): FetchExpenseListAction => ({
  type: types.FETCH_EXPENSE_LIST_REQUEST
})


export const addExpense = (expense: Expense): AddExpenseAction => ({
  type: types.ADD_EXPENSE_REQUEST,
  payload: expense
})
