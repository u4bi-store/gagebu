import * as React from 'react'
import request from 'superagent'
import { User, DailyExpense, Expense } from '../server/models';
import { WingBlank, Icon, Button, Badge, NavBar, List, Flex } from 'antd-mobile';

interface State {
  user: User
  expenses: DailyExpense[]
}

class App extends React.Component<any, State> {
  readonly state = {
    user: {
      name: 'anonymose',
    },
    expenses: [],
  }

  componentDidMount() {
    request.get('/api/users/me').then(res => {
      this.setState({
        user: res.body
      })
    })

    request.get('/api/expenses').then(res => {
      this.setState({
        expenses: res.body
      })
    })
  }

  render() {
    return (
      <div>
        <NavBar 
          mode="dark"
          icon={<Icon type="left" />}
          onLeftClick={() => console.log('onLeftClick')}
          rightContent={[
            <Icon key="0" type="plus" onClick={() => console.log('Click')} />
          ]}>2019년 7월 지출</NavBar>
        <WingBlank>
          {this.state.expenses.map((dailyExpense: DailyExpense) => 
            <List renderHeader={() => {
              return (
                <Flex>
                  <Flex.Item>{dailyExpense.date}</Flex.Item>
                  <Flex.Item style={{textAlign: 'right'}}>총 {currency(dailyExpense.amount)}원</Flex.Item>
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
      </div>
    )
  }
}

const currency = (val: number) => {
  let str = val.toString()
  const ptn = /(\d+)(\d{3})$/
  while (ptn.test(str)) {
    str = str.replace(ptn, '$1,$2')
  }
  return str
}

export default App
