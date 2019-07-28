import * as React from 'react'
import { Icon, NavBar } from 'antd-mobile';
import ExpenseContainer from 'client/containers/Expense';

class App extends React.Component {
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
          <ExpenseContainer />
      </div>
    )
  }
}

export default App
