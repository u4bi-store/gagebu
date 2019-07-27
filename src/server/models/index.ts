export interface User {
  name: string
}

export interface Expense {
  id: number
  text: string
  amount: number
}

export interface DailyExpense {
  date: string
  amount: number
  expenses: Expense[]
}