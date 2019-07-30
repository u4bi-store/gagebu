import * as React from "react";
import { connect } from "react-redux";
import {RootState} from '../reducers';
import * as models from '../../server/models'
import Layout from '../components/Layout'

interface Props {
  layout: models.Layout
}

class LayoutContainer extends React.Component<Props> {
  render() {
    return (
      <Layout {...this.props}/>
    )
  }
}

export default connect(
  (state: RootState) => ({
    layout: state.app.layout
  }),
  {  }
)(LayoutContainer)