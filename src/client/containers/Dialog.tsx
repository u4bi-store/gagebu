import React from 'react'
import * as models from 'dto';
import Dialog from 'client/components/Layout/Dialog'
import { connect } from 'react-redux';
import { RootState } from 'client/reducers'
import {confirmDialog, cancelDialog} from 'client/actions'
import { ConfirmDialogAction, CancelDialogAction } from 'client/reducers/app';

interface Props {
  dialog?: models.Dialog,
  confirmDialog(): ConfirmDialogAction
  cancelDialog(): CancelDialogAction
}

class DialogContainer extends React.Component<Props> {
  render() {
    const {dialog} = this.props
    if (!dialog) return null
    
    return <Dialog  dialog={dialog} confirmDialog={this.props.confirmDialog} cancelDialog={this.props.cancelDialog} />
  }
}

export default connect(
  (state: RootState) => {
    return {
      dialog: state.app.layout.dialog
    }
  }, 
  {confirmDialog, cancelDialog }
)(DialogContainer)
