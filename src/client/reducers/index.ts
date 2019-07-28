import { combineReducers } from "redux";
import { History } from "history";
import { connectRouter, RouterState } from "connected-react-router";
import app, { AppState } from "./app";
import expense, { ExpenseState } from './expense'

export interface RootState {
  router: RouterState,
  app: AppState,
  expense: ExpenseState,
}

const rootReducer = (history: History) => combineReducers({
  router: connectRouter(history),
  app,
  expense,
})

export default rootReducer
