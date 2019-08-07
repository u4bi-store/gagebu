export interface User {
  name: string
}

export interface Expense {
  id?: number;
  amount: number;
  text: string;
  date?: string;
}

export interface DailyExpense {
  date: string
  amount: number
  expenses: Expense[]
}

export interface Layout {
  title: string 
  leftControl?: React.ReactElement
  rightControls?: React.ReactElement[]
  dialog?: Dialog
}

export interface Dialog {
  title: string
  body: string 
  confirmText?: string
  calcelText?: string
}