import * as React from 'react';
import { Route, Switch, Redirect } from "react-router-dom";
import LayoutContainer from '../containers/Layout';
import ExpenseListContainer from '../containers/ExpenseList';
import ExpenseContainer from '../containers/Expense';
import AddExpenseContainer from '../containers/AddExpense';
import EditExpenseContainer from '../containers/EditExpense';
import { ConnectedRouter } from 'connected-react-router';
import { history } from '../store/configureStore';


const RootRouter: React.FC = props => {
  return (
    <ConnectedRouter history={history}> 
      <LayoutContainer>
        <Switch>
          <Route exact path="/expense/:id/edit" component={EditExpenseContainer} />
          <Route exact path="/expense/add" component={AddExpenseContainer} />
          <Route exact path="/expense/:id" component={ExpenseContainer} />
          <Route path="/expense" component={ExpenseListContainer} />
          <Redirect to="/expense" />
        </Switch>
      </LayoutContainer>
    </ConnectedRouter>
  )
}

export default RootRouter;
