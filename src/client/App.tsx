import * as React from 'react'
import request from 'superagent'

interface State {
  user: {
    name: string
  }
}

class App extends React.Component<any, State> {
  readonly state = {
    user: {
      name: 'anonymose'
    }
  }

  componentDidMount() {
    request.get('/api/me').then(res => {
      this.setState({
        user: res.body
      })
    })
  }

  render() {
    return (
      <div>
        사용자 이름: {this.state.user.name}
      </div>
    )
  }
}

export default App
