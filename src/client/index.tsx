import * as React from 'react'
import * as ReactDOM from 'react-dom'
import RootRouter from './routes'
import configureStore from './store/configureStore'
import { Provider } from 'react-redux';

const store= configureStore()

ReactDOM.render(
  <Provider store={store}>
    <RootRouter />
  </Provider>,
  document.getElementById('app')
)