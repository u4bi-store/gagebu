import React from 'react'
import { Expense } from 'server/DTOModels';
import { AddExpenseAction, EditExpenseAction } from 'client/reducers/expense';
import moment = require('moment');
import { WingBlank, WhiteSpace, List, InputItem, Button } from 'antd-mobile';

interface Props {
  initialValue?: Expense
  submit(expense: Expense): AddExpenseAction | EditExpenseAction
}

interface State {
  id?: number
  amount: string
  text: string
  date?: string
}


class EditExpenseForm extends React.Component<Props, State> {
  readonly DATE_FORMAT = 'YYYY-MM-DD'

  constructor(props: Props) {
    super(props)

    if (props.initialValue) {
      this.state = {
        id: props.initialValue.id,
        amount: props.initialValue.amount.toString(),
        text: props.initialValue.text,
        date: moment(props.initialValue.date).format(this.DATE_FORMAT)
      }
    } else {
      this.state = {
        amount: '',
        text: '',
        date: moment().format(this.DATE_FORMAT)
      }
    }
  }

  handleChange = (target: 'amount' | 'text' | 'date') => (val: string) => {
    this.setState(state => ({
      ...state,
      [target]: val
    }))
  }

  handleSubmit = () => {
    const {id, amount, text, date} = this.state
    const expense: Expense  =  {
      id,
      amount: parseInt(amount),
      text,
      date,
    }
    this.props.submit(expense)
  }

  render() {
    return (
      <WingBlank>
        <WhiteSpace />
        <List>
          <InputItem
            placeholder="지출 금액"
            type="digit"
            value={this.state.amount}
            onChange={this.handleChange('amount')}
          >금액</InputItem>
          <InputItem
            placeholder="지출 내용"
            type="text"
            value={this.state.text}
            onChange={this.handleChange('text')}
          >내용</InputItem>
          <InputItem
            placeholder="지출 날짜"
            type="text"
            value={this.state.date}
            onChange={this.handleChange('date')}
          >날짜 </InputItem>
          <List.Item>
            <Button type="primary" onClick={this.handleSubmit}>저장</Button>
          </List.Item>
        </List>
      </WingBlank>
    )
  }
}

export default EditExpenseForm
