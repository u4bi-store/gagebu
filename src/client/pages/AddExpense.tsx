import * as React from 'react'
import { AddExpenseAction } from 'client/reducers/expense';
import { Expense } from 'DTOModels';
import EditExpenseForm from './EditExpense/EditExpenseForm';

interface Props {
  addExpense(expense: Expense): AddExpenseAction
}

const AddExpensePage: React.FC<Props> = props => {
  return (
    <EditExpenseForm submit={props.addExpense} />
  )
}

export default AddExpensePage
