import React from 'react'
import ExpensePage from 'client/pages/Expense'
import { Expense, Layout } from 'DTOModels';
import { connect } from 'react-redux';
import { RootState } from 'client/reducers';
import { setLayout, fetchExpense, deleteExpense } from 'client/actions'
import { match } from 'react-router';
import { expenseSelector } from 'client/selectors';
import { Icon } from 'antd-mobile';
import { push } from 'connected-react-router';
import { Link } from 'react-router-dom';
import { DeleteExpenseAction } from 'client/reducers/expense';

interface Props {
  id: string
  expense?: Expense
  setLayout(layout: Layout): void
  fetchExpense(id: string): void
  deleteExpense(id: string): DeleteExpenseAction
  push(path: string): void
}


class ExpenseContainer extends React.Component<Props> {
  componentDidMount() {
    const {id, setLayout, fetchExpense, deleteExpense, push} = this.props
    setLayout({
      title: '지출 상세',
      leftControl: <Icon type="left" onClick={() => push(`/`)} />,
      rightControls: [
        <Link style={{color: 'white', marginRight: '8px'}} to={`/expense/${id}/edit`}>편집</Link>,
        <div onClick={() => deleteExpense(id)}>삭제</div>
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
  {setLayout, fetchExpense, deleteExpense, push}
)(ExpenseContainer)
