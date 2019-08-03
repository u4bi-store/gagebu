import * as types from './types'
import { FetchExpenseListAction, AddExpenseAction, FetchExpenseAction, EditExpenseAction, DeleteExpenseAction } from 'client/reducers/expense';
import { Expense, Layout } from 'server/DTOModels'
import { SetLayoutAction, ConfirmDialogAction, CancelDialogAction } from 'client/reducers/app';



export const fetchExpenseList = (): FetchExpenseListAction => ({
  type: types.FETCH_EXPENSE_LIST_REQUEST
})

export const fetchExpense = (id: string): FetchExpenseAction => ({
  type: types.FETCH_EXPENSE_REQUEST,
  payload: id
})

export const addExpense = (expense: Expense): AddExpenseAction => ({
  type: types.ADD_EXPENSE_REQUEST,
  payload: expense
})

export const editExpense = (expense: Expense): EditExpenseAction => ({
  type: types.EDIT_EXPENSE_REQUEST,
  payload: expense
})

export const deleteExpense = (id: string): DeleteExpenseAction => ({
  type: types.DELETE_EXPENSE_REQUEST,
  payload: id
})


export const setLayout = (layout: Layout): SetLayoutAction => ({
  type: types.SET_LAYOUT,
  payload: layout,
})

export const confirmDialog = (): ConfirmDialogAction => ({
  type: types.CONFRIM_DIALOG
})

export const cancelDialog = (): CancelDialogAction => ({
  type: types.CANCEL_DIALOG
})