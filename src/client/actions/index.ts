import * as types from './types'
import { FetchExpenseListAction, AddExpenseAction } from '../reducers/expense';
import { Expense, Layout } from 'server/models'
import { SetLayoutAction } from 'client/reducers/app';

export const fetchExpenseList = (): FetchExpenseListAction => ({
  type: types.FETCH_EXPENSE_LIST_REQUEST
})

export const addExpense = (expense: Expense): AddExpenseAction => ({
  type: types.ADD_EXPENSE_REQUEST,
  payload: expense
})

export const setLayout = (layout: Layout): SetLayoutAction => ({
  type: types.SET_LAYOUT,
  payload: layout,
})