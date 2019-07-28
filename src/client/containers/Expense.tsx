import * as React from 'react'
import request from 'superagent'
import { User, DailyExpense, Expense } from 'server/models';
import ExpensePage from 'client/pages/Expense';
import { connect } from 'react-redux';
import { RootState } from 'client/reducers';
import { fetchExpenseList } from 'client/actions'
import { FetchExpenseListAction } from 'client/reducers/expense';

interface Props {
  expenses: Expense[]
  fetchExpenseList(): FetchExpenseListAction
}

interface State {
  user: User
}

class ExpenseContainer extends React.Component<Props, State> {
  readonly state = {
    user: {
      name: 'anonymose',
    },
  }

  componentDidMount() {
    request.get('/api/users/me').then(res => {
      this.setState({
        user: res.body
      })
    })

    this.props.fetchExpenseList()
  }

  render() {
    return <ExpensePage {...this.props} />
  }
}

export default connect(
  (state: RootState) => ({
    expenses: state.expense
  }),
  { fetchExpenseList }
)(ExpenseContainer)

