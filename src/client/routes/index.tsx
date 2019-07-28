import * as React from 'react';
import { BrowserRouter, Route, Switch } from "react-router-dom";
import App from 'client/components/App';
import AddExpensePage from 'client/pages/AddExpense';


const RootRouter: React.FC = props => {
  return (
    <BrowserRouter>
      <Switch>
        <Route exact path="/add" component={AddExpensePage} />
        <Route component={App} />
      </Switch>
    </BrowserRouter>
  )
}

export default RootRouter;
