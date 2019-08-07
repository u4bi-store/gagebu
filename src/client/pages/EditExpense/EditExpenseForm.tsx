import React from 'react'
import { Expense } from 'DTOModels';
import { AddExpenseAction, EditExpenseAction } from 'client/reducers/expense';
import moment = require('moment');
import { WingBlank, WhiteSpace, List, InputItem, Button } from 'antd-mobile';

interface Props {
  initialValue?: Expense
  submit?(expense: Expense): AddExpenseAction | EditExpenseAction
}

interface State {
  id?: number
  amount: string
  text: string
  date?: Date
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
        date: moment(props.initialValue.date).toDate()
      }
    } else {
      this.state = {
        amount: '',
        text: '',
        date: new Date()
      }
    }
  }

  handleChange = (target: 'amount' | 'text' | 'date') => (val: string) => {
    if (target === 'date') {
      this.setState(state => ({
        ...state,
        [target]: moment(val).toDate()
      }))
      return 
    }

    this.setState(state => ({
      ...state,
      [target]: val
    }))
  }

  handleSubmit = () => {
    const {submit} = this.props
    const {id, amount, text, date} = this.state
    const expense: Expense  =  {
      id,
      amount: parseInt(amount),
      text,
    }
    if (date) {
      expense.date = date.toISOString()
    }

    submit && submit(expense)
  }

  render() {
    const {submit} = this.props
    const readonly: boolean = !submit

    return (
      <WingBlank>
        <WhiteSpace />
        <List>
          <InputItem
            placeholder="지출 금액"
            type="digit"
            value={this.state.amount}
            disabled={readonly}
            onChange={this.handleChange('amount')}
          >금액</InputItem>
          <InputItem
            placeholder="지출 내용"
            type="text"
            value={this.state.text}
            disabled={readonly}
            onChange={this.handleChange('text')}
          >내용</InputItem>
          <InputItem
            placeholder="지출 날짜"
            type="text"
            value={moment(this.state.date).format(this.DATE_FORMAT)}
            disabled={readonly}
            onChange={this.handleChange('date')}
          >날짜 </InputItem>
          {!readonly && 
            <List.Item>
              <Button type="primary" onClick={this.handleSubmit}>저장</Button>
            </List.Item>
          }
        </List>
      </WingBlank>
    )
  }
}

export default EditExpenseForm
