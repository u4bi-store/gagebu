import React from 'react'
import ExpensePage from 'client/pages/Expense'
import { Expense, Layout } from 'server/DTOModels';
import { connect } from 'react-redux';
import { RootState } from 'client/reducers';
import { setLayout, fetchExpense } from 'client/actions'
import { match } from 'react-router';
import { expenseSelector } from 'client/selectors';

interface Props {
  id: string
  expense?: Expense
  setLayout(layout: Layout): void
  fetchExpense(id: string): void
}


class ExpenseContainer extends React.Component<Props> {
  componentDidMount() {
    const {id, setLayout, fetchExpense} = this.props
    setLayout({
      title: '지출 상세',
      leftControl: <div>back</div>,
      rightControls: [
        <div>edit</div>,
        <div>delete</div>
      ]
    })
    fetchExpense(id)
  }

  render() {
    const {expense} = this.props
    if (!expense) {
      return null
    }

    return <ExpensePage expense={expense} />
  }

}

interface MatchProps {
  id: string
}

export default connect(
  (state: RootState, props: {match: match<MatchProps>}) => {
    const {id} = props.match.params
    return {
      id,
      expense: expenseSelector(state, id),
    }
  },
  {setLayout, fetchExpense}
)(ExpenseContainer)
