import * as React from 'react'
import { WingBlank,  List, Flex } from 'antd-mobile';
import { DailyExpense, Expense } from 'server/models';
import { currency } from 'server/utils'

interface ExpensePageProps {
  expenses: DailyExpense[]
}

const ExpensePage: React.FC<ExpensePageProps> = props => {
  return (
    <WingBlank>
      {props.expenses.map((dailyExpense: DailyExpense) =>
        <List renderHeader={() => {
          return (
            <Flex>
              <Flex.Item>{dailyExpense.date}</Flex.Item>
              <Flex.Item style={{ textAlign: 'right' }}>총 {currency(dailyExpense.amount)}원</Flex.Item>
            </Flex>
          )
        }}>
          {dailyExpense.expenses.map((expense: Expense) =>
            <List.Item
              key={expense.id}
              arrow="horizontal"
              extra={currency(expense.amount) + '원'}
              align="top"
              multipleLine
            >
              {expense.text} {expense.text} {expense.text}
            </List.Item>
          )}
        </List>
      )}
    </WingBlank>    
  )
}

export default ExpensePage
