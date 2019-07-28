import {all, call, fork, takeLatest, put} from 'redux-saga/effects'
import { FETCH_EXPENSE_LIST_REQUEST, FETCH_EXPENSE_LIST_FAILURE, FETCH_EXPENSE_LIST_SUCCESS, ADD_EXPENSE_REQUEST, ADD_EXPENSE_SUCCESS, ADD_EXPENSE_FAILURE } from 'client/actions/types';
import { FetchExpenseListAction, AddExpenseAction } from 'client/reducers/expense';
import * as apis from 'client/apis'
import {push} from 'connected-react-router'

export default function* rootSaga() {
  yield all([
    fork(expenseSaga)
  ])
}

function* expenseSaga() {
  yield all([
    takeLatest(FETCH_EXPENSE_LIST_REQUEST, fetchExpenseList$),
    takeLatest(ADD_EXPENSE_REQUEST, addExpense$),
  ])
}

function* fetchExpenseList$(action: FetchExpenseListAction) {
  try {
    const data = yield call(apis.fetchExpenseList)
    yield put({ type: FETCH_EXPENSE_LIST_SUCCESS, payload: data })
  } catch {
    yield put({ type: FETCH_EXPENSE_LIST_FAILURE })
  }
}

function* addExpense$(action: AddExpenseAction) {
  try {
    const data = yield call(apis.addExpense, action.payload)
    yield put({ type: ADD_EXPENSE_SUCCESS, payload: data})
    yield put(push('/'))
  } catch {
    yield put({ type: ADD_EXPENSE_FAILURE})
  }
}