import * as React from 'react'
import { WingBlank, InputItem, List, Button } from 'antd-mobile';
import request from 'superagent'

interface Props {

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

  addExpense = () => {
    const {amount, text} = this.state
    request.post('/api/expenses').send({
      amount,
      text,
      date: Date.now(),
    }).then(res => {
      console.log(res.body)
      window.location.href = '/'
    })
  }

  render() {
    return (
      <WingBlank>
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
              onClick={this.addExpense}
              >저장</Button>
          </List.Item>
        </List>
      </WingBlank>
    )
  }
}

export default AddExpensePage
