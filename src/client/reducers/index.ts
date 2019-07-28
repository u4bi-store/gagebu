import { combineReducers } from "redux";

import expense, { ExpenseState } from './expense'
import { History } from "history";
import { connectRouter, RouterState } from "connected-react-router";

export interface RootState {
  router: RouterState,
  expense: ExpenseState,
}

const rootReducer = (history: History) => combineReducers({
  router: connectRouter(history),
  expense,
})

export default rootReducer
