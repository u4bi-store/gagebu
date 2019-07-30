import { Layout } from 'server/DTOModels';
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

export type AppActions = SetLayoutAction

const appReducer = (state = initialState, action: AppActions): AppState => {
  switch (action.type) {
    case types.SET_LAYOUT: 
      return {
        ...state,
        layout: action.payload
      }
    default:
      return state
  }
}

export default appReducer