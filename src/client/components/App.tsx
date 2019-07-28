import * as React from 'react'
import { Icon, NavBar } from 'antd-mobile';
import ExpenseContainer from 'client/containers/Expense';
import { connect } from 'react-redux';
import { RootState } from 'client/reducers';
import { push } from "connected-react-router";

interface Props {
  push(url: string): void
}

class App extends React.Component<Props> {
  render() {
    return (
      <div>
        <NavBar 
          mode="dark"
          icon={<Icon type="left" />}
          onLeftClick={() => console.log('onLeftClick')}
          rightContent={[
            <Icon key="0" type="plus" onClick={() => 
              this.props.push('/add')
            } />
          ]}>2019년 7월 지출</NavBar>
          <ExpenseContainer />
      </div>
    )
  }
}

export default connect(
  (state: RootState) => ({

  }),
  {push}
)(App)
