import React from 'react'
import * as models from 'DTOModels';
import { Modal } from 'antd-mobile';

interface Props {
  dialog: models.Dialog
  confirmDialog(): void
  cancelDialog(): void
}

const Dialog: React.FC<Props> = props => {
  return (
    <Modal
      visible={true}
      transparent
      maskClosable={true}
      onClose={() => console.log('close')}
      title={props.dialog.title}
      footer={[
        {
          text: props.dialog.calcelText || '취소',
          onPress: () => props.cancelDialog()
        }, {
          text: props.dialog.confirmText ||  '확인',
          onPress: () => props.confirmDialog()
        }
      ]}
    >
      {props.dialog.body}
      </Modal>
  )
}

export default Dialog