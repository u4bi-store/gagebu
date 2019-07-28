import * as React from 'react'
import request from 'superagent'
import { User, DailyExpense } from 'server/models';
import ExpensePage from 'client/pages/Expense';

interface ExpenseContainerState {
  user: User
  expenses: DailyExpense[]
}

class ExpenseContainer extends React.Component<{}, ExpenseContainerState> {
  readonly state = {
    user: {
      name: 'anonymose',
    },
    expenses: [],
  }

  componentDidMount() {
    request.get('/api/users/me').then(res => {
      this.setState({
        user: res.body
      })
    })

    request.get('/api/expenses').then(res => {
      this.setState({
        expenses: res.body
      })
    })
  }

  render() {
    return <ExpensePage expenses={this.state.expenses} />
  }
}

export default ExpenseContainer