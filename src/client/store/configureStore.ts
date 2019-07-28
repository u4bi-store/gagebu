import { createStore, applyMiddleware } from "redux";
import createSagaMiddleware from "redux-saga";
import { composeWithDevTools } from 'redux-devtools-extension';
import rootReducer from 'client/reducers'
import rootSaga from 'client/sagas'
import { createBrowserHistory } from 'history'
import { routerMiddleware } from "connected-react-router";

export const history = createBrowserHistory()
const sagaMiddleware = createSagaMiddleware()

const configureStore = () => {
  const store = createStore(
    rootReducer(history),
    composeWithDevTools(
      applyMiddleware(
        sagaMiddleware,
        routerMiddleware(history)
      )
    )
  )

  sagaMiddleware.run(rootSaga)
  
  return store
}

export default configureStore
