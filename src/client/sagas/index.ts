import {all, call, fork, takeLatest, put, take, race} from 'redux-saga/effects'
import { 
  FETCH_EXPENSE_LIST_REQUEST, 
  FETCH_EXPENSE_LIST_FAILURE, 
  FETCH_EXPENSE_LIST_SUCCESS, 
  ADD_EXPENSE_REQUEST, 
  ADD_EXPENSE_SUCCESS, 
  ADD_EXPENSE_FAILURE, 
  FETCH_EXPENSE_REQUEST,
  FETCH_EXPENSE_SUCCESS,
  FETCH_EXPENSE_FAILURE,
  EDIT_EXPENSE_REQUEST,
  EDIT_EXPENSE_SUCCESS,
  EDIT_EXPENSE_FAILURE,
  SHOW_DIALOG,
  DELETE_EXPENSE_REQUEST,
  DELETE_EXPENSE_SUCCESS,
  DELETE_EXPENSE_FAILURE,
  CONFRIM_DIALOG,
  CANCEL_DIALOG
} from 'client/actions/types';
import { FetchExpenseListAction, AddExpenseAction, FetchExpenseAction, EditExpenseAction, DeleteExpenseAction } from 'client/reducers/expense';
import * as apis from 'client/apis'
import {push} from 'connected-react-router'
import { Dialog } from 'dto';

export default function* rootSaga() {
  yield all([
    fork(expenseSaga)
  ])
}


function* expenseSaga() {
  yield all([
    takeLatest(FETCH_EXPENSE_LIST_REQUEST, fetchExpenseList$),
    takeLatest(FETCH_EXPENSE_REQUEST, fetchExpense$),
    takeLatest(ADD_EXPENSE_REQUEST, addExpense$),
    takeLatest(EDIT_EXPENSE_REQUEST, editExpense$),
    takeLatest(DELETE_EXPENSE_REQUEST, deleteExpense$),
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

function* fetchExpense$(action: FetchExpenseAction) {
  try {
    const data = yield call(apis.fetchExpense, action.payload)
    yield put({ type: FETCH_EXPENSE_SUCCESS, payload: data })
  } catch(err) {
    yield put({ type: FETCH_EXPENSE_FAILURE, payload: err })
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

function* editExpense$(action: EditExpenseAction) {
  try {
    const data = yield call(apis.editExpense, action.payload)
    yield put({ type: EDIT_EXPENSE_SUCCESS, payload: data })
    yield put(push('/'))
  } catch {
    yield put({ type: EDIT_EXPENSE_FAILURE })
  }
}

function* deleteExpense$(action: DeleteExpenseAction) {
  try {
    const dialog: Dialog = {
      title: '지출 삭제',
      body: '지출 항목을 삭제할까요?'
    }
    yield put({type: SHOW_DIALOG, payload: dialog})

    const {confirm} = yield race({
      confirm: take(CONFRIM_DIALOG),
      cancel: take(CANCEL_DIALOG),
    })

    if (confirm) {
      const id = action.payload
      yield call(apis.deleteExpense, id)
      yield put({ type: DELETE_EXPENSE_SUCCESS, payload: id })
      yield put(push('/'))
    }
  } catch {
    yield put({ type: DELETE_EXPENSE_FAILURE })
  }
}