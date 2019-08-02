import React from 'react'
import { Expense } from 'server/DTOModels';

interface Props {
  expense: Expense
}

const ExpensePage: React.FC<Props> = ({expense}) => {
  return (
    <div>expense Page: {expense && expense.id}</div>
  )
}

export default ExpensePage