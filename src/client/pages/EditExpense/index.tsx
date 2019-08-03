import * as React from 'react'
import { Expense } from 'server/DTOModels';
import EditExpenseForm from './EditExpenseForm';
import { EditExpenseAction } from 'client/reducers/expense';

interface Props {
  expense?: Expense
  editExpense(expense: Expense): EditExpenseAction
}


const EditExpensePage: React.FC<Props> = props => {
  const {expense, editExpense} = props
  if (!expense) return null
  
  return (
    <EditExpenseForm 
      initialValue={expense}
      submit={editExpense}
    />
  )
}

export default EditExpensePage
