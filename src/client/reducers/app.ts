import { Layout, Dialog } from 'server/DTOModels';
import * as types from 'client/actions/types'

export interface AppState { 
  layout: Layout
}

const initialState: AppState = {
  layout: {
    title: ''
  }
}

export interface SetLayoutAction {
  type: typeof types.SET_LAYOUT,
  payload: Layout
}

export interface ShowDialogAction {
  type: typeof types.SHOW_DIALOG
  payload: Dialog
}

export interface ConfirmDialogAction {
  type: typeof types.CONFRIM_DIALOG
}

export interface CancelDialogAction {
  type: typeof types.CANCEL_DIALOG
}

export type AppActions = SetLayoutAction
  | ShowDialogAction
  | ConfirmDialogAction
  | CancelDialogAction

const appReducer = (state = initialState, action: AppActions): AppState => {
  switch (action.type) {
    case types.SET_LAYOUT: 
      return {
        ...state,
        layout: action.payload
      }
    case types.SHOW_DIALOG: 
      return {
        ...state,
        layout: {
          ...state.layout,
          dialog: action.payload
        }
      }
    case types.CONFRIM_DIALOG:
    case types.CANCEL_DIALOG:
      return {
        ...state,
        layout: {
          ...state.layout,
          dialog: undefined
        }
      }
    default:
      return state
  }
}

export default appReducer