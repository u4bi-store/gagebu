import * as React from 'react';
import { Route, Switch } from "react-router-dom";
import LayoutContainer from '../containers/Layout';
import ExpenseContainer from '../containers/Expense';
import AddExpenseContainer from '../containers/AddExpense';
import { ConnectedRouter } from 'connected-react-router';
import { history } from '../store/configureStore';


const RootRouter: React.FC = props => {
  return (
    <ConnectedRouter history={history}> 
      <LayoutContainer>
        <Switch>
          <Route exact path="/add" component={AddExpenseContainer} />
          <Route component={ExpenseContainer} />
        </Switch>
      </LayoutContainer>
    </ConnectedRouter>
  )
}

export default RootRouter;
