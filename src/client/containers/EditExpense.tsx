import React from 'react'
import { Expense, Layout } from 'DTOModels';
import { connect } from 'react-redux';
import { RootState } from 'client/reducers';
import { setLayout, fetchExpense, editExpense } from 'client/actions'
import { match } from 'react-router';
import { expenseSelector } from 'client/selectors';
import { push } from 'connected-react-router';
import EditExpensePage from 'client/pages/EditExpense';
import { EditExpenseAction } from 'client/reducers/expense';

interface Props {
  id: string
  expense?: Expense
  setLayout(layout: Layout): void
  fetchExpense(id: string): void
  editExpense(expense: Expense): EditExpenseAction
}


class EditExpenseContainer extends React.Component<Props> {
  componentDidMount() {
    const {id, setLayout, fetchExpense} = this.props
    setLayout({
      title: '지출 편집'
    })
    fetchExpense(id)
  }

  render() {
    const {expense, editExpense} = this.props
    if (!expense) {
      return null
    }

    return (
      <EditExpensePage 
        expense={expense}
        editExpense={editExpense} 
      />
    )
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
  {setLayout, fetchExpense, editExpense, push}
)(EditExpenseContainer)
