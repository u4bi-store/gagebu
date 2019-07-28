import * as React from 'react'
import { WingBlank, InputItem, List, Button } from 'antd-mobile';

const AddExpensePage: React.FC = _ => {
  return (
    <WingBlank>
      <List>
        <InputItem
          placeholder="지출 금액을 입력"
          type="digit"
        >금액</InputItem>
        <InputItem
          placeholder="지출 내용을 입력"
          type="text"
        >내용</InputItem>
        <List.Item>
          <Button 
            type="primary"
            onClick={() => {
              window.location.href = '/'
            }}
            >저장</Button>
        </List.Item>
      </List>
    </WingBlank>
  )
}

export default AddExpensePage
