import * as React from 'react'
import { WingBlank, InputItem, List, Button, WhiteSpace } from 'antd-mobile';
import request from 'superagent'
import { AddExpenseAction } from 'client/reducers/expense';
import { Expense } from 'server/models';

interface Props {
  addExpense(expense: Expense): AddExpenseAction
}

interface State {
  amount: string 
  text: string
}

class AddExpensePage extends React.Component<Props, State> {
  readonly state = {
    amount: '',
    text: '',
  }

  handleChange = (target: 'amount' | 'text') => (val: string) => {
    this.setState(state => ({
      ...state,
      [target]: val
    }))
  }

  handleAddExpense = () => {
    const {text} = this.state
    const amount = parseInt(this.state.amount, 10)
    if (isNaN(amount)) return 
    this.props.addExpense({amount, text})
  }

  render() {
    return (
      <WingBlank>
        <WhiteSpace />
        <List>
          <InputItem
            placeholder="지출 금액을 입력"
            type="digit"
            onChange={this.handleChange('amount')}
          >금액</InputItem>
          <InputItem
            placeholder="지출 내용을 입력"
            type="text"
            onChange={this.handleChange('text')}
          >내용</InputItem>
          <List.Item>
            <Button 
              type="primary"
              onClick={this.handleAddExpense}
              >저장</Button>
          </List.Item>
        </List>
      </WingBlank>
    )
  }
}

export default AddExpensePage
