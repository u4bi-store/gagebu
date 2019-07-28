import * as React from 'react';
import { Route, Switch } from "react-router-dom";
import App from 'client/components/App';
import AddExpenseContainer from 'client/containers/AddExpense';
import { ConnectedRouter } from 'connected-react-router';
import { history } from 'client/store/configureStore';


const RootRouter: React.FC = props => {
  return (
    <ConnectedRouter history={history}> 
      <Switch>
        <Route exact path="/add" component={AddExpenseContainer} />
        <Route component={App} />
      </Switch>
    </ConnectedRouter>
  )
}

export default RootRouter;
