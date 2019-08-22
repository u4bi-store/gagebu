import * as React from 'react';
import { Route, Switch, Redirect } from "react-router-dom";
import LayoutContainer from 'client/containers/Layout';
import ExpenseListContainer from 'client/containers/ExpenseList';
import ExpenseContainer from 'client/containers/Expense';
import AddExpenseContainer from 'client/containers/AddExpense';
import EditExpenseContainer from 'client/containers/EditExpense';
import { ConnectedRouter } from 'connected-react-router';
import { history } from 'client/store/configureStore';


const RootRouter: React.FC = props => {
  return (
    <ConnectedRouter history={history}> 
      <LayoutContainer>
        <Switch>
          <Route exact path="/expense/:id/edit" component={EditExpenseContainer} />
          <Route exact path="/expense/add" component={AddExpenseContainer} />
          <Route exact path="/expense/:id" component={ExpenseContainer} />
          <Route path="/expense" component={ExpenseListContainer} />
          {/* <Redirect to="/expense" /> */}
          <Route path="/login" component={() => {
            return (
              <div>login</div>
            )
          }} />
        </Switch>
      </LayoutContainer>
    </ConnectedRouter>
  )
}

export default RootRouter;
