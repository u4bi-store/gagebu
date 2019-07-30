import { Expense } from 'server/DTOModels';
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

export interface AddExpenseAction {
  type: typeof types.ADD_EXPENSE_REQUEST,
  payload: Expense
}

export interface AddExpenseSuccessAction {
  type: typeof types.ADD_EXPENSE_SUCCESS,
  payload: Expense
}

export type ExpenseActions = FetchExpenseListAction 
  | FetchExpenseListSuccessAction
  | AddExpenseAction 
  | AddExpenseSuccessAction


const expenseReducer = (state = initialState, action: ExpenseActions): ExpenseState => {
  switch(action.type) {
    case types.FETCH_EXPENSE_LIST_SUCCESS:
      if (action.payload) {
        return action.payload
      }
    case types.ADD_EXPENSE_SUCCESS:
      if (action.payload) {
        return [
          ...state,
          {...action.payload as Expense}
        ]
      }
    default: 
      return state
  }
}

export default expenseReducer