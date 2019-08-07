import { Expense } from 'DTOModels';
import * as types from 'client/actions/types'

export interface ExpenseState extends Array<Expense> { }

const initialState: ExpenseState = []

export interface FetchExpenseListAction {
  type: typeof types.FETCH_EXPENSE_LIST_REQUEST
}

export interface FetchExpenseListSuccessAction {
  type: typeof types.FETCH_EXPENSE_LIST_SUCCESS,
  payload: Expense[]
}

export interface FetchExpenseAction {
  type: typeof types.FETCH_EXPENSE_REQUEST
  payload: string
}

export interface FetchExpenseSuccessAction {
  type: typeof types.FETCH_EXPENSE_SUCCESS
  payload: Expense
}

export interface AddExpenseAction {
  type: typeof types.ADD_EXPENSE_REQUEST,
  payload: Expense
}

export interface AddExpenseSuccessAction {
  type: typeof types.ADD_EXPENSE_SUCCESS,
  payload: Expense
}

export interface EditExpenseAction {
  type: typeof types.EDIT_EXPENSE_REQUEST,
  payload: Expense
}

export interface EditExpenseSuccessAction {
  type: typeof types.EDIT_EXPENSE_SUCCESS,
  payload: Expense
}

export interface DeleteExpenseAction {
  type: typeof types.DELETE_EXPENSE_REQUEST,
  payload: string
}

export interface DeleteExpenseSuccessAction {
  type: typeof types.DELETE_EXPENSE_SUCCESS,
  payload: string
}

export type ExpenseActions = FetchExpenseListAction 
  | FetchExpenseListSuccessAction
  | FetchExpenseAction
  | FetchExpenseSuccessAction
  | AddExpenseAction 
  | AddExpenseSuccessAction
  | EditExpenseAction
  | EditExpenseSuccessAction
  | DeleteExpenseAction
  | DeleteExpenseSuccessAction


const expenseReducer = (state = initialState, action: ExpenseActions): ExpenseState => {
  switch(action.type) {
    case types.FETCH_EXPENSE_LIST_SUCCESS:
      if (action.payload) {
        return action.payload
      }
    case types.FETCH_EXPENSE_SUCCESS: {
      if (action.payload) {
        const expense: Expense = action.payload as Expense
        if (!state.find(item => item.id === expense.id)) {
          return [...state, expense]
        }

        return state.map(state => {
          if (expense.id === state.id) {
            return expense
          }
          return state
        }) 
      }
    }
    case types.ADD_EXPENSE_SUCCESS:
      if (action.payload) {
        return [
          ...state,
          {...action.payload as Expense}
        ]
      }
    case types.EDIT_EXPENSE_SUCCESS: 
      if (action.payload) {
        const expense: Expense = action.payload as Expense
        return state.map(item => {
          return item.id === expense.id 
            ? {...expense}
            : item
        })
      }
    case types.DELETE_EXPENSE_SUCCESS:
      if (action.payload) {
        const id = parseInt(action.payload as string, 0)
        return state.filter(item => {
          return item.id === id
        })
      }
    default: 
      return state
  }
}

export default expenseReducer