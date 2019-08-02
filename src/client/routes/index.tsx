import * as React from 'react';
import { Route, Switch } from "react-router-dom";
import LayoutContainer from '../containers/Layout';
import ExpenseListContainer from '../containers/ExpenseList';
import ExpenseContainer from '../containers/Expense';
import AddExpenseContainer from '../containers/AddExpense';
import { ConnectedRouter } from 'connected-react-router';
import { history } from '../store/configureStore';


const RootRouter: React.FC = props => {
  return (
    <ConnectedRouter history={history}> 
      <LayoutContainer>
        <Switch>
          <Route exact path="/:id" component={ExpenseContainer} />
          <Route exact path="/add" component={AddExpenseContainer} />
          <Route component={ExpenseListContainer} />
        </Switch>
      </LayoutContainer>
    </ConnectedRouter>
  )
}

export default RootRouter;
