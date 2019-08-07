import { RootState } from "client/reducers";
import { Expense } from "DTOModels";

export const expenseSelector = (state: RootState, id: string): Expense | undefined => {
  const expenseId = parseInt(id, 10)
  if (isNaN(expenseId)) return 
  return state.expense.find(item => item.id === expenseId)
}
