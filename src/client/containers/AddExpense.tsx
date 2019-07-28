import * as React from 'react'
import AddExpensePage from 'client/pages/AddExpense'
import { Expense } from 'server/models';
import {AddExpenseAction} from 'client/reducers/expense'
import {addExpense} from 'client/actions'
import { connect } from 'react-redux';
import { RootState } from 'client/reducers';


interface Props {
  addExpense(expense: Expense): AddExpenseAction
}

interface State {

}

class AddExpenseContainer extends React.Component<Props, State> {
  render() {
    return <AddExpensePage {...this.props}/>
  }
}

export default connect(
  (state: RootState) => ({

  }),
  { addExpense }
)(AddExpenseContainer)