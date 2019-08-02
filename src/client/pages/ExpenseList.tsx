import * as React from 'react'
import { WingBlank,  List, Flex } from 'antd-mobile';
import moment from 'moment';
import { Expense, DailyExpense } from 'server/DTOModels';
import { currency } from 'server/utils'

interface ExpensePageProps {
  expenses: Expense[]
  push(path: string): void
}

const ExpenseListPage: React.FC<ExpensePageProps> = props => {
  const {push} = props;
  const dailyExpense: DailyExpense[] = props.expenses.reduce((acc: DailyExpense[], expense: Expense) => {
    const dateStr = moment(expense.date).format('YYYY-MM-DD')
    const dailyExpense: DailyExpense | undefined = acc.find(dailyExpense => dailyExpense.date === dateStr)
    
    if (dailyExpense) {
      dailyExpense.expenses.push(expense)
      dailyExpense.amount += expense.amount
    } else {
      acc.push({
        date: dateStr,
        amount: expense.amount,
        expenses: [expense]
      })
    }

    return acc
  }, [])

  return (
    <WingBlank>
      {dailyExpense.map((dailyExpense: DailyExpense) =>
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
              onClick={() => push(`/${expense.id}`)}
            >
              {expense.text}
            </List.Item>
          )}
        </List>
      )}
    </WingBlank>    
  )
}

export default ExpenseListPage
