import React from 'react'
import { Expense } from 'DTOModels';
import EditExpenseForm from './EditExpense/EditExpenseForm';

interface Props {
  expense: Expense
}

const ExpensePage: React.FC<Props> = ({expense}) => {
  return (
    <EditExpenseForm initialValue={expense}/>
  )
}

export default ExpensePage